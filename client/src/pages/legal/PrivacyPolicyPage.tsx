import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-3xl">Privacy Policy</CardTitle>
          <p className="text-sm text-muted-foreground">
            Last updated: <time dateTime="2025-08-12">August 02, 2025</time>
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          <section className="space-y-2">
            <h2 className="text-xl font-semibold">Who we are</h2>
            <p >
              <strong>Shakthi Picture Framing</strong> (“SPF”, “we”, “our”, “us”) understands that our customers, visitors, suppliers,
              and business partners care deeply about their personal data, including how it is collected, used, disclosed, stored, protected,
              and safeguarded from misuse. We are fully committed to processing your personal data in strict compliance with the applicable
              laws of Sri Lanka, including the Personal Data Protection Act No. 9 of 2022 (PDPA), when you use any of the features and
              functions available on our website or related digital platforms (“Platform”), interact with us via external services or
              applications, communicate with our customer support channels, or access our services through any device connected to the
              internet, including computers, mobile devices, or tablets.
              <br />
               <br />
              PLEASE READ THIS PRIVACY POLICY CAREFULLY. BY CLICKING “SIGN UP”, “LOGIN”, “I AGREE/CONSENT TO SHAKTHI PICTURE FRAMING’S
              PRIVACY POLICY”, OR ANY SIMILAR STATEMENT PRESENTED ON OUR PLATFORM OR IN THE COURSE OF USING OUR SERVICES, YOU ACKNOWLEDGE
              THAT YOU HAVE READ, UNDERSTOOD, AND AGREED TO THE TERMS OF THIS PRIVACY POLICY AND CONSENT TO THE COLLECTION, USE, DISCLOSURE,
              STORAGE, TRANSFER, AND/OR PROCESSING OF YOUR PERSONAL DATA FOR THE PURPOSES STATED HEREIN AND UNDER THE TERMS DESCRIBED BELOW.
            </p>
          </section>

          <Separator />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">1. INTRODUCTION TO THIS PRIVACY POLICY</h2>
            <p >
            1.1 Data Protection Commitment – Data protection is a matter of trust, and your privacy is of the utmost importance to us.
            This Privacy Policy explains how Shakthi Picture Framing collects, uses, shares, and protects your personal data in connection
            with our services and your use of the Platform. This Privacy Policy applies regardless of the type of device or method you use
            to access our Platform or services.
            <br /><br />
            1.2 Jurisdiction and Entity Responsible – For all users in Sri Lanka, the data controller responsible for your personal data is
            Shakthi Picture Framing, a registered Sri Lankan business operating under the laws of Sri Lanka, with its principal place of
            business at 54 K. Cyril C. Perera Mawatha, Colombo, Sri Lanka.
            <br /><br />
            1.3 Scope of Application – In the course of you using Shakthi Picture Framing’s website (both web and mobile versions), as well
            as our products, tools, features, and other services, we will be collecting, using, disclosing, storing, and/or processing data,
            including your personal data. For the purposes of this Privacy Policy, “Platform” refers to all relevant applications, websites,
            and related technology controlled by us, and “Services” refers to all products, information, features, and services provided by
            Shakthi Picture Framing from time to time via the Platform.
            <br /><br />
            1.4 Purpose of This Policy – This Privacy Policy exists to ensure that you are fully informed about how we collect, use, disclose,
            store, and/or process the data we receive during the course of providing you with our services or access to the Platform, whether
            or not you have registered to use our Platform. We will only process your personal data in accordance with this Privacy Policy and
            applicable Sri Lankan laws.

            <br /><br />
            1.5 Reading This Policy Together with Other Notices – It is important that you read this Privacy Policy together with any other
            applicable legal or contractual notices we may provide when collecting, using, disclosing, and/or processing personal data about
            you, so that you are fully aware of how and why we are using your personal data.
            <br /><br />
            1.6 Updates to This Policy – We may update this Privacy Policy from time to time in response to legal, technical, or business changes.
            When we update the policy, we will take appropriate measures to inform you, as required by law, such as posting an updated Privacy Policy
            on the Platform. Where permissible under Sri Lankan law, your continued use of our Services or access to the Platform, including placing
            orders or otherwise engaging with our services, following such updates will constitute your acknowledgment and acceptance of the changes.
            <br /><br />
            1.7 Relationship with Other Agreements – This Privacy Policy applies alongside other contractual clauses, consent forms, or notices
            that relate to the collection, storage, use, disclosure, and/or processing of your personal data by us, and it is not intended to
            override them unless expressly stated otherwise.
            <br /><br />
            1.8 Applicability to All Users – Unless otherwise stated, all terms in this Privacy Policy apply to every person using our Platform,
            regardless of whether you have created an account as a registered customer or are using the Platform as a guest visitor.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. COLLECTING AND USING YOUR PERSONAL DATA</h2>
            <h3 className="text-lg font-semibold">Types of Data Collected</h3>
            <h5 className="text-md font-bold">2.1 Personal Data</h5>
            <ul className="list-disc pl-5  space-y-1">
                <li><strong>Full name</strong> (first name, last name, and any other legal identifiers) </li>
                <li><strong>Email address</strong> </li>
                <li><strong>Telephone or mobile number</strong> </li>
                <li><strong>Residential or business address</strong>  (including street, city, district, province, and postal code)</li>
                <li><strong>Account login details</strong>  (email, encrypted password, and authentication tokens) </li>
                <li><strong>Delivery instructions or alternative contact details provided for fulfilling an order</strong> </li>
            </ul>

            <h5 className="text-md font-bold">2.2 Usage Data</h5>
            <p > We collect “Usage Data” automatically when you access or interact with our Platform
                or Services. This may include: </p>
            <ul className="list-disc pl-5  space-y-1">
                <li><strong>Internet Protocol (IP) address of your device</strong> </li>
                <li><strong>Browser type, version, and language</strong> </li>
                <li><strong>Device type, operating system, and unique device identifiers</strong> </li>
                <li><strong>The pages of our website or application that you visit, the time and date of your visit, and the time spent on each page</strong> </li>
                <li><strong>The website or search engine that referred you to our Platform</strong> </li>
                <li><strong>Interaction data such as clicks, scrolls, and form submissions</strong> </li>
                <li><strong>Diagnostic and performance data to monitor system stability and prevent abuse</strong> </li>
            </ul>
            <p>When accessing our Services via a mobile device, we may collect:</p>
            <ul className="list-disc pl-5  space-y-1">
                <li><strong>Device model and manufacturer</strong> </li>
                <li><strong>Mobile operating system version</strong> </li>
                <li><strong>Mobile network information</strong> </li>
                <li><strong>Mobile browser type and version</strong> </li>
            </ul>

            <h5 className="text-md font-bold">2.3 How We Receive Your Personal Data</h5>
            <p > We may receive personal data directly from you or from third-party sources in the following situations: </p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>When you create an account or update your profile</strong> </li>
                <li><strong>When you place an order, request a quotation, or submit a custom framing request</strong> </li>
                <li><strong>When you participate in competitions, surveys, or promotional campaigns</strong> </li>
                <li><strong>When you contact customer service or communicate with us through inquiry form, email, or phone</strong> </li>
                <li><strong>When you interact with us via third-party platforms (e.g., Facebook, Instagram, Google sign-in)</strong> </li>
                <li><strong>When you post reviews, feedback, or public comments on our Platform</strong> </li>
                <li><strong>When third-party service providers (e.g., payment processors, delivery partners) share order-related details for service fulfillment</strong> </li>
            </ul>

            <h5 className="text-md font-bold">2.4 Collection of Computer Data</h5>
            <p >When you access the Platform, our servers automatically log technical information for analytics, fraud
                prevention, and service improvement, including: </p>
            <ul className="list-disc pl-5 space-y-1">
                <li><strong>IP address and geolocation (country, city)</strong> </li>
                <li><strong>Device and browser identifiers</strong> </li>
                <li><strong>Access timestamps and session duration</strong> </li>
                <li><strong>Page load times and error logs</strong> </li>
                <li><strong>Operating system and hardware information</strong> </li>
            </ul>
            <p >
              We use this information to optimize our Services, improve site performance, and enhance security. Where required under Sri Lankan law, we will
              obtain your prior consent before using cookies or similar tracking technologies.
              </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. USE AND DISCLOSURE OF YOUR PERSONAL DATA</h2>
            <h3 className="text-lg font-semibold">Purpose of Use</h3>
            <p >
              3.1 We collect, use, and disclose personal data only for purposes permitted under the Personal Data Protection
              Act No. 9 of 2022 of Sri Lanka, and other applicable laws, and where required, only upon obtaining your express or implied consent.
            </p>
            <br />
            <p >  3.2 Depending on your relationship with us—whether as a customer purchasing products, a supplier providing goods or services,
                a visitor to our website, or any other category of data subject—your personal data may be used for one or more purposes
            </p>
            <br />
            <h3 className="text-lg font-semibold">Disclosure to Third Parties</h3>
            <p > 3.3 In the course of providing our services and fulfilling the above purposes, we may share your personal data with:
            </p>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>Service Providers and Contractors</strong> – including logistics and delivery partners, payment processors, IT support providers, marketing agencies, and data analytics firms. </li>
                    <li><strong>Legal and Regulatory Bodies </strong> – such as courts, law enforcement, or government agencies where required by law. </li>
                    <li><strong>Business Partners and Affiliates</strong> – where collaboration is necessary for service provision or integration with partner platforms. </li>
                    <li><strong>Professional Advisors </strong>– including auditors, legal counsel, and compliance consultants. </li>
                    <li><strong>Any other third party with your consent.</strong> </li>
                 </ul>
                  <br />
            <h3 className="text-lg font-semibold">International Data Transfers</h3>
            <p >
                3.4 We may transfer your personal data outside Sri Lanka for purposes such as secure data hosting, backup, or
                use of cloud-based systems. Any such transfer will be in compliance with the Sri Lankan PDPA and relevant cross-border
                data protection requirements, ensuring that your data receives an equivalent standard of protection in the destination
                country.
            </p>

            <h3 className="text-lg font-semibold">Third-Party Services</h3>
            <p >
                3.5 If you engage with third-party services through our Platform (e.g., payment gateways, loyalty programs), your data
                may be collected directly by those providers under their own privacy policies. We are not responsible for the privacy
                practices of third-party sites or services, and we encourage you to review their policies before use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">4. WITHDRAWAL OF CONSENT AND YOUR RIGHTS</h2>
            <p>
              4.1 Withdrawal of Consent – You may at any time withdraw your consent for us to continue collecting, using, disclosing,
              storing, or otherwise processing your personal data for any purpose set out in this Privacy Policy. To do so, you must contact
              us in writing using the details provided in Section 11 – Contact Us.
            </p>
            <p >
              4.1 Withdrawal of Consent – You may at any time withdraw your consent for us to continue collecting, using, disclosing,
              storing, or otherwise processing your personal data for any purpose set out in this Privacy Policy. To do so, you must contact
              us in writing using the details provided in Section 11 – Contact Us.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">5. DISCLOSURE OF PERSONAL DATA UNDER SPECIAL CIRCUMSTANCES</h2>
            <p>
              5.1 Business Transactions: In the event of a merger, acquisition, restructuring, or sale of assets involving Shakthi Picture
              Framing, your personal data may be transferred to the acquiring entity or its advisors, subject to confidentiality agreements
              and compliance with the Sri Lankan PDPA. We will notify you in advance if your personal data becomes subject to a different
              privacy policy.
            </p>
             <br />
            <p>5.2 Compliance with Law: We may disclose your personal data where required to do so under:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>A valid legal order, court judgment, or regulatory directive;</li>
                <li>A lawful request from law enforcement or other public authorities; or </li>
                <li> Any applicable statutory or regulatory obligation under Sri Lankan law.</li>
            </ul>
            <br />
            <p>5.3 Protection of Rights and Safety: We may disclose your personal data in good faith where necessary to:</p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Protect and defend the rights, property, or safety of Shakthi Picture Framing, our customers, or the public;</li>
                <li>Prevent, investigate, or take action regarding potential breaches of our Terms of Service, fraud, or other unlawful activity; </li>
                <li>Enforce contractual rights or pursue available legal remedies.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">6. SECURITY OF YOUR PERSONAL DATA</h2>
            <p>
              6.1 We take reasonable administrative, technical, and physical measures to protect your personal data from unauthorized access,
              disclosure, alteration, or destruction. These measures include, but are not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Secure socket layer (SSL) encryption for all data transmissions;</li>
                <li>Restricted access to personal data on a “need-to-know” basis; </li>
                <li>Use of firewalls, intrusion detection systems, and anti-malware protection;</li>
                <li>Regular security audits and data protection training for staff. </li>
            </ul>

             <br />
            <p>6.2 While we strive to use industry-standard safeguards, no method of transmission over
                the internet or method of electronic storage is entirely secure. Therefore, we cannot
                guarantee absolute security of your personal data.</p>

          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">7. LINKS TO THIRD-PARTY WEBSITES</h2>
            <p>
              7.1 Our Platform may contain links to external websites operated by third parties. Please note that we are not responsible
              for the content, privacy policies, or practices of those external sites. We strongly encourage you to review the privacy
              policy of any third-party site before providing personal data.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">8. RETENTION OF PERSONAL DATA</h2>
            <p>
              8.1 We will retain your personal data for as long as is necessary to fulfill the purposes for which it was collected,
              or as required under any applicable law in Sri Lanka.
            </p>
            <p>
              The retention period will vary depending on the nature of the data and the legal requirements that apply, including:
            </p>
            <ul className="list-disc pl-5 space-y-1">
                <li>Transactional Data (e.g., order records, invoices) – retained for a minimum of seven (7) years in accordance with the Sri Lankan Inland Revenue Act and other statutory requirements.</li>
                <li>Customer Account Data – retained for as long as your account remains active and up to two (2) years after account closure, unless legal obligations require longer retention.</li>
                <li>Marketing Data – retained until you opt out or withdraw consent.</li>
                <li>Security and Log Data – retained for a period necessary for system integrity and fraud prevention. </li>
            </ul>
            <p>
              8.3 Once your personal data is no longer required, we will securely delete, anonymize, or destroy it in a manner
              that prevents unauthorized access, disclosure, or reconstruction.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">9. CHANGES TO THIS PRIVACY POLICY</h2>
            <p>
              9.1 We may update or revise this Privacy Policy from time to time to reflect changes in legal, technical, or business requirements.
            </p>
            <p>
              9.2 When we make significant changes, we will notify you through:An update notice on our website;, Email or SMS notification to your registered contact information; or Any other method permitted under Sri Lankan law.
            </p>
            <p>
              9.3 The updated Privacy Policy will take effect on the date specified in the notice. By continuing to use our Platform or Services after the effective date, you agree to be bound by the updated terms.
            </p>
          </section>

          <Separator />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">10. COUNTRY-SPECIFIC RIDER – SRI LANKA</h2>
            <p>
             This section applies specifically to data subjects in Sri Lanka:
            </p>
            <p>
              10.1 All collection, processing, storage, and transfer of personal data is carried out in compliance with the Personal Data Protection Act No. 9 of 2022 of Sri Lanka.
            </p>
            <ul className="list-disc pl-5 space-y-1">
                <li>The receiving country has data protection laws substantially equivalent to the PDPA;</li>
                <li>Adequate safeguards are in place (e.g., contractual clauses or binding corporate rules); or</li>
                <li>You have expressly consented to the transfer after being informed of possible risks.</li>
            </ul>

            <p>
              10.3 You have the right under the PDPA to:
            </p>
             <ul className="list-disc pl-5 space-y-1">
                <li>Request access to your personal data;</li>
                <li>Request correction of inaccurate or incomplete personal data;</li>
                <li>Request deletion or anonymization of personal data where it is no longer necessary;</li>
                <li>Withdraw consent at any time without affecting the lawfulness of processing before the withdrawal;</li>
                <li>Lodge a complaint with the Data Protection Authority of Sri Lanka if you believe your data has been mishandled.</li>
            </ul>
          </section>

            <section className="space-y-2">
            <h2 className="text-xl font-semibold">11. CONTACT US</h2>
            <p>
             If you have any questions, concerns, or requests regarding this Privacy Policy or our handling of your personal data, you may contact us at:
            </p>
            <p>
              Shakthi Picture Framing <br />
              Address: 54 K. Cyril C. Perera Mawatha, Colombo, Sri Lanka <br />
              Phone: +94 079 793782 <br/>
              Email: <a href="mailto:privacy@shakthipictureframing.lk">privacy@shakthipictureframing.lk</a> <br />
              Office Hours: Monday – Friday, 9:00 AM to 5:00 PM (Sri Lanka Time)
            </p>
            <p>

            </p>
          </section>

          <p className="text-xs text-muted-foreground">
            This page is a template and not legal advice. Please have a qualified professional review before production use.
            See our <Link to="/terms" className="underline">Terms of Service</Link>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
