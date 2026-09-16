import { type LegalDocs } from './types';

export const legal: LegalDocs = {
  about: {
    title: 'About the project',
    intro:
      'Stars is a storefront where artists, singers and bloggers sell official merch and their own personal items directly to fans.',
    sections: [
      {
        heading: 'Why we built it',
        body: [
          'An item that belonged to an artist, or that they released themselves, is valuable for its story rather than its fabric. Yet buying one usually comes down to luck: at a show, in a closed channel, or from a reseller who cannot prove where it came from.',
          'We brought those sales into one place so buyers can see exactly who an item comes from, and artists no longer have to handle payments, packing and logistics on their own.',
        ],
      },
      {
        heading: 'What is sold here',
        list: [
          'Official merch: tees, hoodies, headwear, accessories.',
          'Limited collections and drops released alongside tours and records.',
          'Personal items — stage outfits, instruments, objects with a history.',
          'Collaborations between artists and brands.',
        ],
      },
      {
        heading: 'Why the items are genuine',
        body: [
          'A storefront is opened by the artist or their official representative — we verify brand rights and identity before the first item goes live.',
          'Every product is tied to a specific star, so you can see whose merch it is before you even open the description.',
        ],
      },
      {
        heading: 'How buying works',
        list: [
          'Pick an item from an artist storefront or from the general catalogue.',
          'Place the order — no account needed, just a name, phone number and email.',
          'Pay by card on the payment provider secure page.',
          'Receive the order by courier or at a pickup point, depending on your city.',
        ],
      },
    ],
    withContacts: true,
  },

  partners: {
    title: 'Become a partner',
    intro:
      'If you are an artist, a blogger or their representative, you can open a storefront on Stars and sell merch without running your own online shop.',
    sections: [
      {
        heading: 'Who it fits',
        list: [
          'Musicians, singers and bands — merch for tours, releases and collaborations.',
          'Bloggers and creators — products for their own audience.',
          'Actors, athletes and public figures — personal items and signature collections.',
          'Managers and labels handling several artists at once.',
        ],
      },
      {
        heading: 'What we take on',
        body: [
          'You need no website, no card acquiring and no contract with a courier service — all of it is already in place.',
        ],
        list: [
          'A storefront with product cards and your own styling.',
          'Online payments and refunds to the buyer.',
          'Storage, packing and delivery of orders.',
          'Sales statistics and exports for your accountant.',
        ],
      },
      {
        heading: 'How to start',
        list: [
          'Send a request by email or messenger — contacts are at the bottom of this page.',
          'We confirm that you are the rights holder or their representative.',
          'We agree on the range, prices and settlement terms.',
          'We upload the products and open the storefront — usually within a few working days.',
        ],
      },
      {
        heading: 'What we will need from you',
        list: [
          'Documents proving rights to the trademark or likeness.',
          'Bank details for transferring revenue.',
          'Product photos, or access to samples so we can shoot them.',
          'A contact person responsible for the storefront on your side.',
        ],
      },
    ],
    withContacts: true,
  },

  offer: {
    title: 'Public offer',
    intro:
      'This document is a public offer — a proposal to enter into a contract of sale on the terms set out below. Placing an order means accepting them.',
    sections: [
      {
        heading: '1. Definitions',
        list: [
          '"Platform" — the Stars website and its mobile versions.',
          '"Seller" — the legal entity whose details are listed at the end of this document.',
          '"Partner" — an artist or their representative who has listed an item on the platform.',
          '"Buyer" — a person who has placed an order on the platform.',
          '"Item" — merch, accessories or personal belongings shown in the catalogue.',
        ],
      },
      {
        heading: '2. Subject of the contract',
        body: [
          'The Seller undertakes to hand over the item selected on the platform, and the Buyer undertakes to accept and pay for it.',
          'The description, specifications and images are published on the product card. Minor differences in shade between a photo and the physical item are not considered a defect.',
        ],
      },
      {
        heading: '3. When the contract takes effect',
        body: [
          'The contract is concluded once the order has been paid for. Until then either party may cancel the order without consequence.',
          'Order confirmation is sent to the email address given at checkout.',
        ],
      },
      {
        heading: '4. Price and payment',
        body: [
          'The price is shown on the product card and includes all applicable taxes. Delivery is calculated separately and shown before the order is confirmed.',
          'Payment is processed online on the payment provider side. The platform neither stores nor processes card details.',
        ],
      },
      {
        heading: '5. Handover',
        body: [
          'Fulfilment and delivery times are described in the Delivery section and form part of this contract.',
          'The risk of accidental loss passes to the Buyer at the moment the order is received.',
        ],
      },
      {
        heading: '6. Liability',
        body: [
          'The parties bear liability in accordance with the law of the country where the Seller is registered.',
          'The Seller is not liable for delays caused by force majeure, nor for incorrect details supplied by the Buyer at checkout.',
        ],
      },
      {
        heading: '7. Changes to these terms',
        body: [
          'The Seller may amend this offer. A new version takes effect once published on this page and does not apply to orders paid for before that.',
        ],
      },
    ],
    withContacts: true,
  },

  logos: {
    title: 'Logos',
    intro:
      'The Stars mark may be used in coverage of the project, in partner materials and in the press. Below are the variants and the grounds each one is drawn for.',
    sections: [
      {
        heading: 'Where you may use it',
        list: [
          'In news, reviews and interviews about the project.',
          'In materials from artists and partners selling on the platform.',
          'In presentations and at events when referring to our cooperation.',
        ],
      },
      {
        heading: 'What you may not do',
        list: [
          'Change the proportions, colour, slant or lettering of the mark.',
          'Add outlines, shadows, glows or other effects.',
          'Place the mark on a busy background where it stops being legible.',
          'Use the mark as though it stood for your own product, or for a partnership that does not exist.',
        ],
      },
      {
        heading: 'Clear space and size',
        body: [
          'Leave clear space around the mark at least equal to its own height. Minimum width is 80 pixels on screen and 20 millimetres in print.',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms of use',
    intro:
      'These terms describe the rules for using the Stars platform. By using the site you accept them.',
    sections: [
      {
        heading: '1. General',
        body: [
          'These terms govern the relationship between the platform administration and visitors to the site.',
          'If you disagree with any clause, please stop using the site.',
        ],
      },
      {
        heading: '2. Placing an order',
        body: [
          'Orders can be placed without an account. You provide a name, phone number and email address — enough for us to reach you and hand the order to a courier.',
          'You are responsible for the accuracy of those details. If an order cannot be delivered because of an error in them, repeat delivery is charged separately.',
        ],
      },
      {
        heading: '3. What is not allowed',
        list: [
          'Interfering with the site, creating excessive load, circumventing technical restrictions.',
          'Copying platform content for commercial use without written permission.',
          'Placing orders in someone else name or with someone else payment details.',
          'Presenting yourself as a representative of the platform or of the artists listed on it.',
        ],
      },
      {
        heading: '4. Rights to content',
        body: [
          'Texts, product images, the platform design and its source code are protected by copyright.',
          'Artist images and trademarks belong to their rights holders and are used with permission.',
        ],
      },
      {
        heading: '5. Limitation of liability',
        body: [
          'The platform does not guarantee uninterrupted operation and is not liable for losses caused by temporary unavailability of the service.',
          'The party that listed an item is responsible for its specifications and quality.',
        ],
      },
      {
        heading: '6. Changes',
        body: [
          'The current version always lives on this page. By continuing to use the site after changes, you accept the new version.',
        ],
      },
    ],
    withContacts: true,
  },

  delivery: {
    title: 'Delivery',
    intro:
      'Orders are picked at the warehouse and handed to a courier service. Below are the timings, the options, and what to do if something is wrong with your parcel.',
    sections: [
      {
        heading: 'Fulfilment time',
        body: [
          'Items held in stock are picked within one to two working days of payment.',
          'Limited collections and pre-orders may take longer — the exact time is stated on the product card.',
        ],
      },
      {
        heading: 'Delivery options',
        list: [
          'Courier within the city — usually the next working day after picking.',
          'Intercity and remote areas — at the courier service rates.',
        ],
      },
      {
        heading: 'Cost',
        body: [
          'Delivery is calculated at checkout and shown before payment. The total in your basket already includes it.',
        ],
      },
      {
        heading: 'Receiving the order',
        body: [
          'Before signing for the parcel, check that the packaging is intact and the order is complete.',
          'If the packaging is damaged, record it together with the courier or pickup point staff — without that note a dispute takes considerably longer to resolve.',
        ],
      },
      {
        heading: 'If something is wrong',
        body: [
          'Write to us within 24 hours of receiving the order and attach photos of the item and the packaging. We will look into it and propose a solution.',
        ],
      },
    ],
    withContacts: true,
  },

  rights: {
    title: 'Information for rights holders',
    intro:
      'If an item or material on the platform infringes your rights, tell us — we will review the notice and act on it.',
    sections: [
      {
        heading: 'Who this is for',
        body: [
          'This section addresses trademark owners, authors of images and texts, and artists or their representatives whose name or likeness has been used without permission.',
        ],
      },
      {
        heading: 'What to include',
        list: [
          'A link to the product or material page on the platform.',
          'What exactly the infringement consists of.',
          'Documents proving your rights: trademark certificate, contract, power of attorney.',
          'Contact details for a reply and the name of the person signing the notice.',
        ],
      },
      {
        heading: 'How we handle it',
        body: [
          'A notice is logged on the day it arrives. We reply within five working days.',
          'If the infringement is confirmed, the disputed material is taken down and the partner who listed it is notified.',
          'If the notice is incomplete, we request the missing documents. The listing stays in the catalogue meanwhile — a decision follows once the notice is complete.',
        ],
      },
      {
        heading: 'Where to send it',
        body: [
          'Notices are accepted at the email address below. Start the subject line with the word "Rights" so it reaches the right queue faster.',
        ],
      },
    ],
    withContacts: true,
  },

  privacy: {
    title: 'Privacy policy',
    intro:
      'This document explains what data the platform collects, why it is needed, who it is shared with and how long it is kept.',
    sections: [
      {
        heading: '1. What we collect',
        list: [
          'Name, phone number and email address — you provide them at checkout.',
          'Order contents, total and delivery address.',
          'Technical data: device type, interface language, anonymised visit statistics.',
        ],
      },
      {
        heading: '2. Why we need it',
        list: [
          'To pick your order and hand it to a courier.',
          'To contact you about the order and send payment confirmation.',
          'To review a complaint if something went wrong with the order.',
          'To understand which parts of the site work poorly and fix them.',
        ],
      },
      {
        heading: '3. Who it is shared with',
        body: ['We do not sell or pass your data to third parties for advertising.'],
        list: [
          'The payment provider — to process the payment. Card details are entered on their side and never reach us.',
          'The courier service — name, phone and address, without which the order cannot be delivered.',
          'Government authorities — only on a lawful request.',
        ],
      },
      {
        heading: '4. How long we keep it',
        body: [
          'Order data is kept for as long as accounting and tax law requires. Once that period ends it is deleted or anonymised.',
        ],
      },
      {
        heading: '5. Your rights',
        list: ['Ask what data about you we hold.', 'Require inaccurate data to be corrected.'],
      },
      {
        heading: '6. Cookies',
        body: [
          'The site uses cookies to remember your interface language and colour theme. You can switch them off in your browser settings — some features will stop working.',
        ],
      },
      {
        heading: '7. Contacting us',
        body: ['For any question about data processing, write to the email address below.'],
      },
    ],
    withContacts: true,
  },
};
