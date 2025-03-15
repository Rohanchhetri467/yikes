import React from 'react';

const TermsAndConditions: React.FC = () => {
  return (
    <section className='container my-5 py-5'>
      <h2 className='text-center mt-4 text-2xl font-semibold'>
        Terms and Conditions
      </h2>
      <hr className='mx-auto my-4 w-1/4 border-t-2 border-gray-400' />
      <div className='terms-content mx-auto'>
        <h4 className='text-xl font-semibold'>1. General Information</h4>
        <p>
          Yikes is registered in Bhutan and operates under the applicable laws.
          Our website provides an online platform for purchasing vintage
          clothing.
        </p>

        <h4 className='text-xl font-semibold mt-4'>2. User Accounts</h4>
        <ul className='list-inside list-disc'>
          <li>
            To access certain features, you may need to create an account.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account and password.
          </li>
          <li>You must provide accurate and complete information.</li>
        </ul>

        <h4 className='text-xl font-semibold mt-4'>3. Orders and Payments</h4>
        <ul className='list-inside list-disc'>
          <li>All orders placed are subject to availability and acceptance.</li>
          <li>
            Prices are listed in Ngultrum and may be subject to changes without
            notice.
          </li>
          <li>We accept payments via E-payment registered in Bhutan.</li>
          <li>In case of payment failure, your order may be canceled.</li>
        </ul>

        <h4 className='text-xl font-semibold mt-4'>4. Shipping and Delivery</h4>
        <ul className='list-inside list-disc'>
          <li>We ship to all the Dzongkhags within the country.</li>
          <li>
            Delivery times are estimated and may vary due to unforeseen
            circumstances.
          </li>
          <li>
            Customers are responsible for providing accurate shipping details.
          </li>
        </ul>

        <h4 className='text-xl font-semibold mt-4'>5. Returns and Refunds</h4>
        <ul className='list-inside list-disc'>
          <li>
            Our return policy allows returns within 2 days from the delivery
            date.
          </li>
          <li>
            Items must be returned in their original condition with proof of
            purchase.
          </li>
          <li>Refunds will be processed according to our refund policy.</li>
        </ul>

        <h4 className='text-xl font-semibold mt-4'>6. Intellectual Property</h4>
        <ul className='list-inside list-disc'>
          <li>
            All content on this website, including text, images, and logos, is
            owned by Yikes and protected by intellectual property laws.
          </li>
          <li>
            You may not use, copy, or distribute our content without permission.
          </li>
        </ul>

        <h4 className='text-xl font-semibold mt-4'>
          7. Limitation of Liability
        </h4>
        <ul className='list-inside list-disc'>
          <li>
            We are not responsible for any indirect, incidental, or
            consequential damages arising from the use of our services.
          </li>
          <li>
            Our liability is limited to the total amount paid by you for the
            purchased product/service.
          </li>
        </ul>

        <h4 className='text-xl font-semibold mt-4'>8. Privacy Policy</h4>
        <p>
          By using our services, you agree to our Privacy Policy, which outlines
          how we collect, use, and protect your data.
        </p>

        <h4 className='text-xl font-semibold mt-4'>9. Governing Law</h4>
        <ul className='list-inside list-disc'>
          <li>These terms are governed by the laws of Bhutan.</li>
          <li>Any disputes shall be resolved in the courts of Bhutan.</li>
        </ul>

        <h4 className='text-xl font-semibold mt-4'>
          10. Changes to Terms and Conditions
        </h4>
        <ul className='list-inside list-disc'>
          <li>
            We reserve the right to update these terms at any time without prior
            notice.
          </li>
          <li>
            Continued use of our services constitutes acceptance of the updated
            terms.
          </li>
        </ul>

        <p className='mt-5'>
          For any questions, please contact us at{' '}
          <a href='mailto:shopyikes@gmail.com' className='text-blue-500'>
            shopyikes@gmail.com
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default TermsAndConditions;
