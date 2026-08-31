import type { Metadata } from 'next';
import { ContactPage } from '../../views/ContactPage';

export const metadata: Metadata = {
  title: 'Contact Kamat Realty - Panaji Headquarters & VIP Concierge Desk',
  description:
    'Schedule a private chauffeured site tour or executive consultation with Kamat Realty developers in Panaji, Goa. Connect via phone, email, or WhatsApp.',
  openGraph: {
    title: 'Connect with Kamat Realty VIP Concierge | Goa Headquarters',
    description:
      'Direct line to our executive development directors, bespoke site previews, and confidential investment consultations.',
    url: 'https://kamatrealty.com/contact',
  },
};

export default function Page() {
  return <ContactPage />;
}
