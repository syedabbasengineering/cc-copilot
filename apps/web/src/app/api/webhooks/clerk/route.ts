import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import { SubscriptionStatus, SubscriptionPlan, ContentTone } from '@prisma/client';

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = await headers();
  const svixId = headerPayload.get('svix-id');
  const svixTimestamp = headerPayload.get('svix-timestamp');
  const svixSignature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.text();
  const body = JSON.parse(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || '');

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  // Handle the webhook
  const eventType = evt.type;
  console.log(`Webhook received: ${eventType}`);

  try {
    switch (eventType) {
      case 'user.created':
        await handleUserCreated(evt);
        break;
      
      case 'user.updated':
        await handleUserUpdated(evt);
        break;
      
      case 'user.deleted':
        await handleUserDeleted(evt);
        break;
      
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new Response('Webhook processed successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

async function handleUserCreated(evt: WebhookEvent) {
  const { id, email_addresses, first_name, last_name, image_url } = evt.data;
  
  if (!email_addresses || email_addresses.length === 0) {
    throw new Error('No email address found for user');
  }

  const email = email_addresses[0].email_address;
  const name = [first_name, last_name].filter(Boolean).join(' ') || null;

  console.log(`Creating user: ${email}`);

  // Create user in database with trial subscription
  await prisma.user.create({
    data: {
      id: id,
      email,
      name,
      subscriptionStatus: SubscriptionStatus.FREE_TRIAL,
      trialStartedAt: new Date(),
      userSettings: {
        create: {
          defaultTone: ContentTone.FRIENDLY,
          autoSave: true,
          emailNotifications: true,
        },
      },
      subscription: {
        create: {
          status: SubscriptionStatus.FREE_TRIAL,
          plan: SubscriptionPlan.FREE_TRIAL,
          trialStart: new Date(),
          trialEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
        },
      },
    },
  });

  console.log(`User created successfully: ${email}`);
}

async function handleUserUpdated(evt: WebhookEvent) {
  const { id, email_addresses, first_name, last_name } = evt.data;
  
  if (!email_addresses || email_addresses.length === 0) {
    console.warn('No email address found for user update');
    return;
  }

  const email = email_addresses[0].email_address;
  const name = [first_name, last_name].filter(Boolean).join(' ') || null;

  console.log(`Updating user: ${email}`);

  // Update user in database
  await prisma.user.upsert({
    where: { id },
    update: {
      email,
      name,
      updatedAt: new Date(),
    },
    create: {
      id,
      email,
      name,
      subscriptionStatus: SubscriptionStatus.FREE_TRIAL,
      trialStartedAt: new Date(),
      userSettings: {
        create: {
          defaultTone: ContentTone.FRIENDLY,
          autoSave: true,
          emailNotifications: true,
        },
      },
      subscription: {
        create: {
          status: SubscriptionStatus.FREE_TRIAL,
          plan: SubscriptionPlan.FREE_TRIAL,
          trialStart: new Date(),
          trialEnd: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        },
      },
    },
  });

  console.log(`User updated successfully: ${email}`);
}

async function handleUserDeleted(evt: WebhookEvent) {
  const { id } = evt.data;

  console.log(`Deleting user: ${id}`);

  // Soft delete or anonymize user data based on your privacy policy
  // For now, we'll just mark the user as deleted but keep the data for analytics
  await prisma.user.update({
    where: { id },
    data: {
      email: `deleted_${id}@deleted.com`,
      name: 'Deleted User',
      brandVoice: null,
      updatedAt: new Date(),
    },
  });

  console.log(`User marked as deleted: ${id}`);
}

// Handle GET request for webhook endpoint verification
export async function GET() {
  return new Response('Clerk webhook endpoint is active', { status: 200 });
}