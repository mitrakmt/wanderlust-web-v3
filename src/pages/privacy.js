import Head from 'next/head'

export default function PrivacyPolicy() {
    return (
        <section className="relative ml-0 sm:ml-16 px-6 py-8">
            <Head>
                <title>Your Privacy Matters | Wanderlust App Privacy Policy</title>
                <meta name="description" content="At Wanderlust App, we take your privacy seriously. Our privacy policy outlines our commitment to protecting your personal information and explains how we collect, use, and store your data. We value your trust and are dedicated to ensuring the safety and security of your information. Read our privacy policy to learn more about how we protect your privacy on Wanderlust App." />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Your Privacy Matters | Wanderlust App Privacy Policy" />
                <meta property="og:url" content="https://www.wanderlustapp.io/privacy" />
                <meta property="og:description" content="At Wanderlust App, we take your privacy seriously. Our privacy policy outlines our commitment to protecting your personal information and explains how we collect, use, and store your data. We value your trust and are dedicated to ensuring the safety and security of your information. Read our privacy policy to learn more about how we protect your privacy on Wanderlust App." />
                {/* <meta property="og:image" content={blog?.image_url} /> */}

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:title" content="Your Privacy Matters | Wanderlust App Privacy Policy" />
                <meta property="twitter:url" content="https://www.wanderlustapp.io/privacy" />
                <meta property="twitter:description" content="At Wanderlust App, we take your privacy seriously. Our privacy policy outlines our commitment to protecting your personal information and explains how we collect, use, and store your data. We value your trust and are dedicated to ensuring the safety and security of your information. Read our privacy policy to learn more about how we protect your privacy on Wanderlust App." />
                {/* <meta property="twitter:image" content={blog?.image_url} /> */}
            </Head>
            <h1 className="text-3xl mb-4 font-bold text-gray-800 dark:text-gray-100">Privacy Policy</h1>
            <p className="text-gray-800 dark:text-gray-100" style={{ whiteSpace: 'pre-line'}}>{`
                We at Wanderlust are committed to protecting your privacy. This privacy policy applies to our browser extension (Wanderlust Extension), our website (https://wanderlustapp.io), and any subdomains of wanaderlustapp.io.

                The information we gather or process is used solely for core functionality of Wanderlust and to improve the quality and security of our service. Your information isn’t and has never been sold to third parties.

                What information is being stored, or accessed?
                ‍
                Wanderlust account information
                Your name, email, account settings, and extension data (such as to-dos and links) are transferred and stored securely, solely for your usage within our extension and not shared with any other third parties, except as specified in this policy.

                Payment information
                To upgrade to Wanderlust Pro, your credit card number, credit card expiration date, security code, name, country and postal code are required. All payment processing is done through a PCI compliant third party (Stripe, Inc.). When paying by a credit card, the card details do not pass through our servers, they are sent directly to Stripe and are stored securely, as per their Privacy and Security policies.

                To perform requested changes to or inquiries about your Wanderlust Pro account (canceling, refunding, or changing payment details), authorized members of Wanderlust's support team could potentially view payment-related information contained in Stripe’s databases (this is limited to billing name, billing address, postal code, the last four digits of credit card(s), and credit card expiry date(s)) while accessing subscription information via Stripe’s payment dashboard. This information will only be accessed upon your request.

                Data accessible through WebExtensions API
                WebExtension APIs used within Chrome Extensions, Safari Extensions, Edge Add-ons, and Firefox Add-ons have fine-grained permission levels that are enforced by the Web Browser, restricting information that our extension has access to within your Browser. The Wanderlust extension can only access specific information that you have explicitly granted permission for. We can not and do not track your browsing history.

                Additional optional permissions may be requested when you enable specific features. When you enable a feature that requests an optional permission, your Web Browser will make it clear what permission(s) are being requested. The feature will be accessible once you choose to allow the requested permission(s).

                Feature usage data
                To improve the content, features and overall experience of the extension, we gather and log data on how our users access and use Wanderlust Extension. For example, we may log actions like clicking on a photo source, favoriting a location (not the content, just the action of completing it).

                Some of this usage data is sent to Google Analytics. In these cases, we do not send any identifying information that could be correlated with your account. We also make use of their IP anonymization feature to prevent your IP from being associated with your usage data.

                What vendors/sub-processors do you use?
                We use several vendors/sub-processors to conduct various aspects of our business.

                Mongo, Mandrill, Unsplash, Google Analytics, Mixpanel, Slack, Notion, Gmail, Mailchimp, Stripe, Railway, and Zapier.

                What are my rights in relation to my personal data?
                By using Wanderlust Extension, you may exercise the following rights:

                The right to refuse to provide your personal data
                The voluntary Personal Data you provide to us is an integral part of your use of Wanderlust Extension. You can choose to forego the provision of that data, but you will be restricted from using our services.

                The right to access and modify your personal data
                Through your use of Wanderlust Extension, you can access and amend your own data at any time. This includes changing your email, name, and payment information on your Profile page. As well as adding, editing and deleting other Wanderlust data like your to-dos, links, notes, countdowns, daily focus’, etc.

                The right to be forgotten
                You can manually delete your account by clicking Delete my account on your Wanderlust account’s Profile page at any time. See the “What happens to my data when I delete my account?” section below to learn more about the deletion process.

                The right to obtain your personal data
                Upon request, we will provide a data export of all your data stored in our system. If you wish to receive an export of your data, or have any problems deleting your account, please contact us.

                The right to submit a complaint
                If you have a complaint about the way in which your Personal Data is handled, please contact us. After submitting a complaint, we will reply within five (5) business days to confirm that we have received your complaint. After receiving your complaint, we will investigate it and provide you with our response within two (2) weeks.

                The right to submit a complaint with a data protection authority
                If you are a resident of the European Union, and you are not satisfied with the outcome of the complaint submitted to us, you have the right to lodge a complaint with your local data protection authority.

                What happens to my data when I delete my account?
                Upon account deletion, your account is flagged as deleted and your data is no longer accessible. This data is stored for a grace period (90 days) to allow for account recovery in the case of accidental or malicious deletion, or your desire to reopen your account. Upon request, you can expedite the process of performing a hard delete to remove all of your personal data from our databases. After a hard delete, your data will be deleted from our system, but could still be present in encrypted database backups for up to an additional 35 days.

                To request an expedited hard delete, please contact us.

                Is my data secure?
                Data security is a priority at all times. We use a Tier 1 cloud provider to run our operations (Railway).

                In Transit
                All data communication in transit to and from our servers is secured using HTTPS/TLS. All Wanderlust domains have HTTP Strict Transport Security (HSTS) enabled and are in the HSTS Preload list on the major browsers supporting this feature.

                At Rest
                All data in our databases and their associated backups are encrypted at rest.

                Will the privacy policy change?
                Although most changes are likely to be minor, Wanderlust may change its Privacy Policy from time to time, and at Wanderlust's sole discretion. Wanderlust encourages visitors to frequently check this page for any changes to its Privacy Policy. Your continued use of this site after any change in this Privacy Policy will constitute your acceptance of such change.

                If you have any questions about Wanderlust's Privacy policy, please contact us.

                ‍Last updated May 18, 2022.
            `}</p>
        </section>
    )
}