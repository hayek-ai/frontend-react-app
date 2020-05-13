import React from "react";
import { Link } from "react-router-dom";

// Mui stuff
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

// Components
import FullPageLayout from "../components/Layout/FullPageLayout";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "20px 0",
  },
  paragraph: {
    margin: "10px 0",
  },
  link: {
    color: theme.palette.primary.main,
  },
  list: {
    ...theme.typography.body1,
    margin: "10px 0",
  },
}));

const TermsOfUse = (props) => {
  const classes = useStyles();
  return (
    <FullPageLayout containerType="wideContainer">
      <Typography variant="h4" className={classes.heading}>
        Terms of Use
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        *PLEASE READ OUR TERMS OF USE CAREFULLY BEFORE YOU USE OUR WEB SITE*
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Hayek, Inc. ("Hayek" "we," or "us") provides its web site, hayek.ai,
        located at 
        <a className={classes.link} href="https://hayek.ai">
          https://hayek.ai/
        </a>{" "}
        (together with all other websites, mobile applications and services
        operated by or on behalf of Hayek, Inc., the "Site"), to you, an
        individual user ("you") for your individual usage, subject to compliance
        with the terms and conditions set forth herein.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        1. Agreement
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        By using the Site, you agree to be bound by our Terms of Use (the
        "TOU"). If you do not agree to the terms and conditions contained in the
        TOU and 
        <Link to="/privacy-policy" className={classes.link}>
          Hayek's privacy policy
        </Link>
        , please do not access or otherwise use the Site or any information
        contained herein.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        You affirm that you are over the age of 18, as the Site is not intended
        for children under 18. If it comes to Hayek's attention through reliable
        means that a registered user is a child under 18 years of age, Hayek
        will cancel that user's account.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        2. Changes to the TOU
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We reserve the right at any time to:
      </Typography>
      <ul className={classes.list}>
        <li>Change the terms and conditions of the TOU;</li>
        <li>
          Change the Site, including eliminating or discontinuing any content or
          feature of the Site; or
        </li>
        <li>
          Impose fees, charges or other conditions for use of the Site or parts
          thereof (with reasonable notice).
        </li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        Hayek may modify the Site at any time without prior notice, and you
        accept those modifications if you continue to use the Site. You should
        check the Site frequently to see recent changes.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        3. Important Securities Disclaimer
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        You understand that no content published on the Site constitutes a
        recommendation that any particular security, portfolio of securities,
        transaction or investment strategy is suitable for any specific person.
        You further understand that none of the bloggers, information providers,
        app providers, or their affiliates are advising you personally
        concerning the nature, potential, value or suitability of any particular
        security, portfolio of securities, transaction, investment strategy or
        other matter. To the extent that any of the content published on the
        Site may be deemed to be investment advice or recommendations in
        connection with a particular security, such information is impersonal
        and not tailored to the investment needs of any specific person. You
        understand that an investment in any security is subject to a number of
        risks, and that discussions of any security published on the Site will
        not contain a list or description of relevant risk factors. In addition,
        please note that some of the stocks about which content is published on
        the Site have a low market capitalization and/or insufficient public
        float. Such stocks are subject to more risk than stocks of larger
        companies, including greater volatility, lower liquidity and less
        publicly available information. Blogs, postings or content on the Site
        which may or may not be deemed by you to be recommendations may have an
        effect on their stock prices.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        You understand that the Site may contain opinions from time to time with
        regard to securities mentioned in other Hayek blogs or products, and
        that opinions in one blog or product may be different from those in
        another blog or product. We require all employees to disclose every
        stock in which they, their immediate family, or any entity under their
        control, have a personal interest, if such stock is mentioned in a blog,
        post, or content which they write. However, you understand and agree
        that non-employees, including outside bloggers or other content
        contributors or their affiliates, may write about securities in which
        they or their firms have a position, that they may trade for their own
        account, and that they may or may not be subject to a disclosure policy.
        In cases where Hayek becomes aware that one of its employees has
        violated his or her disclosure obligation, Hayek will take appropriate
        action. In addition, outside bloggers or content contributors may be
        subject to certain restrictions on trading for their own account.
        However, you understand and agree that at the time of any transaction
        that you make, one or more bloggers or content contributors or their
        affiliates may have a position in the securities they write about.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        You understand that performance data is supplied by sources believed to
        be reliable, that the calculations on our Site are made using such data,
        and that such calculations are not guaranteed by these sources, the
        information providers, or any other person or entity, and may not be
        complete.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        From time to time, reference may be made on our Site to prior articles
        and opinions we have published. These references may be selective, may
        reference only a portion of an article or opinion, and are likely not to
        be current. As markets change continuously, previously published
        information and data may not be current and should not be relied upon.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        All content on the Site is presented only as of the date published or
        indicated, and may be superseded by subsequent market events or for
        other reasons. In addition, you are responsible for setting the cache
        settings on your browser to ensure you are receiving the most recent
        data.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        4. No Investment Recommendations or Professional Advice
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        The Site is not intended to provide tax, legal, insurance or investment
        advice, and nothing on the Site should be construed as an offer to sell,
        a solicitation of an offer to buy, or a recommendation for any security
        by Hayek or any third party. You alone are solely responsible for
        determining whether any investment, security or strategy, or any other
        product or service, is appropriate or suitable for you based on your
        investment objectives and personal and financial situation. You should
        consult an attorney or tax professional regarding your specific legal or
        tax situation.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        5. Copyright, Linking Policy and Trademarks
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        The Site and the content contained herein, as well as all copyrights,
        including without limitation, the text, documents, articles, products,
        software, graphics, photos, sounds, videos, interactive features,
        services, links, User Submissions (as defined below), third-party apps,
        and any other content on the Site ("Content") and the trademarks,
        service marks and logos contained therein are the property of Hayek and
        its third-party licensors or providers. You may access and use the
        Content, and download and/or print out copies of any content from the
        Site, solely for your personal, non-commercial use. If you download or
        print a copy of the Content for personal use, you must retain all
        copyright and other proprietary notices contained therein. You
        acknowledge that you do not acquire any ownership rights by using the
        Site. Hayek reserves all rights not expressly granted in and to the
        Site.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        The Site contains links to other Internet websites or links to Content
        created by third parties which is published on the Site. We neither
        control nor endorse such other websites or Content, nor have we reviewed
        or approved any Content that appears on such other websites or on our
        Site. Please read the terms of use and privacy policy of any such third
        party sites that you interact with before you engage in any activity.
        You are solely responsible and liable for your use of and linking to all
        third party sites. You acknowledge and agree that we shall not be held
        responsible for the legality, accuracy, or appropriateness of any
        Content, advertising, products, services, or information located on our
        Site or any other websites, nor for any loss or damages caused or
        alleged to have been caused by the use of or reliance on any such
        content. Similarly, while we endeavor to facilitate the provision of
        quality apps, we are not responsible for any loss or damages caused or
        alleged to have been caused by their use.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        You may link to any content on the Site. If you are interested in
        reprinting, republishing or distributing content from Hayek, please
        contact Hayek to obtain written consent. Hayek™ is a trademark and/or
        service mark of Hayek or an affiliate. All other trademarks, service
        marks, and logos used on our web sites are the trademarks, service
        marks, or logos of their respective owners.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        This section shall survive any termination of these TOU.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        6. User Conduct
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        You may not use, copy, display, sell, license, de-compile, republish,
        upload, post, transmit, distribute, create derivative works or otherwise
        exploit Content from the Site to online bulletin boards, message boards,
        newsgroups, chat rooms, or in other any manner, without our prior
        written permission. Modification of the Content or use of the Content
        for any purpose other than your own personal, noncommercial use is a
        violation of our copyright and other proprietary rights, and can subject
        you to legal liability.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        In addition, in connection with your use of the Site and its services
        (including by sending private messages to other registered users of the
        Site via your Hayek direct messaging account), you agree not to:
      </Typography>
      <ul className={classes.list}>
        <li>
          Restrict or inhibit any other visitor from using the Site, including,
          without limitation, by means of "hacking" or defacing any portion of
          the Site;
        </li>
        <li>Use the Site for any unlawful purpose;</li>
        <li>
          Express or imply that any statements you make are endorsed by us,
          without our prior written consent;
        </li>
        <li>
          Modify, adapt, sublicense, translate, sell, reverse engineer,
          decompile or disassemble any portion of the Site;
        </li>
        <li>
          Disable, damage or alter the functioning or appearance of the Site,
          including the presentation of advertising;
        </li>
        <li>
          "Frame" or "mirror" any part of the Site without our prior written
          authorization;
        </li>
        <li>
          Use any robot, spider, site search/retrieval application, or other
          manual or automatic device or process to download, retrieve, index,
          "data mine", "scrape", "harvest" or in any way reproduce or circumvent
          the navigational structure or presentation of the Site or its
          contents;
        </li>
        <li>
          Harvest or collect information about visitors to the Site without
          their express consent;
        </li>
        <li>
          Send unsolicited or unauthorized advertisements, spam, chain letters,
          etc to other users of the Site;
        </li>
        <li>
          Transmit any Content which contains software viruses, or other harmful
          computer code, files or programs.
        </li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        You also agree to comply with all applicable laws, rules and regulations
        in connection with your use of the Site and the content made available
        therein. We aim to prevent, detect and not knowingly facilitate money
        laundering and terrorism financing activities. You may not use the Site
        in a manner which violates our anti-money laundering, counter terrorist
        financing or similar regulatory obligations.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We reserve the right to close, suspend, or limit access to your
        Subscription, account and/or the Site in the event your use violates
        such obligations or if, after reasonable inquiry, we are unable to
        obtain information about you which is required to verify your identity.
        We may require you to provide additional information or documents to
        verify your identity, including your date of birth, physical address,
        taxpayer or other identification number, your physical address,
        government issued identification document or other information that will
        allow us to reasonably identify you.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        In order to access some of the services of the Site, you will have to
        create an account. By creating this account you agree to the following:
      </Typography>
      <ul className={classes.list}>
        <li>You may only maintain a single account;</li>
        <li>
          You may never share your account user name or password or knowingly
          provide or authorize access to your account (including without
          limitation a "Subscription", as defined below in Section 20);
        </li>
        <li>You may never use another user's account without permission;</li>
        <li>
          When creating your account, you must provide accurate and complete
          information;
        </li>
        <li>
          You are solely responsible for the activity that occurs on your
          account, and you must keep your account password secure;
        </li>
        <li>
          You must notify us immediately of any breach of security or
          unauthorized use of your account.
        </li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        You will be liable for any use made of your account or password and the
        losses of Hayek or others due to such unauthorized use. We will not be
        liable for your losses caused by any unauthorized use of your account.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Hayek has the right to terminate your access to the Site, in its sole
        discretion.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        7. Overview of Posting Content; Monitoring Content
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        The Site permits the submission of Content by users of the Site,
        including without limitation comments, articles, links, and private
        messages sent to other registered users through the Site's messaging
        system, including from those who give permission to Hayek to post their
        Content ("User Submissions") and the hosting, sharing and publishing of
        such User Submissions on the Site. Hayek has the right in its sole
        discretion and without further notice to you, to monitor, censor, edit,
        move, delete, and/or remove any and all Content posted on its Site or
        any Content transmitted by direct messaging or by any other method to or
        from your Hayek user account at any time and for any reason. Without
        limiting the foregoing, Hayek has the right to delete any comment or
        Content that it believes, in its sole discretion, does or may violate
        the TOU of the Site by you.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        On user-generated Content and Comments, Hayek reserves the right to
        remove content that violates one of the following principles, as
        determined by Hayek, at our discretion:
      </Typography>
      <ul className={classes.list}>
        <li>
          No incitement to hatred. Material that promotes hatred toward groups
          based on race or ethnic origin, religion, disability, gender, age,
          veteran status, or sexual orientation/gender identity will be removed.
        </li>
        <li>No pornography or pedophilia</li>
        <li>
          No direct or veiled threats against any person or group of people.
        </li>
        <li>No copyright infringement</li>
        <li>
          No plagiarism. This includes posting content verbatim from other
          sources without proper attribution and/or repurposing content from
          other sources and presenting it without reference to the content's
          creator.
        </li>
        <li>
          No publishing of other people's personal information, such as credit
          card numbers, Social Security Numbers, and driver's and other license
          numbers.
        </li>
        <li>
          No impersonation of others in a manner that is intended to or does
          mislead or confuse others.
        </li>
        <li>
          No use for unlawful purposes or for promotion of dangerous and illegal
          activities. Your account may be terminated and you may be reported to
          the appropriate authorities.
        </li>
        <li>No spamming, link-spamming or transmitting malware and viruses.</li>
        <li>No personal attacks.</li>
        <li>No profanity or vulgarity.</li>
        <li>No business solicitations or advertising.</li>
        <li>No inappropriate, unethical or misleading behavior.</li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        <strong>Important note:</strong> Hayek encourages civil,
        thought-provoking debate and idea-sharing among investors and
        stock-market followers. In order to maintain a level of discourse
        appropriate for our user base, we are strongly opposed to trolling,
        uncivilized discussion, mudslinging, inappropriate language, and blanket
        dismissal of others' ideas. At our discretion, we may delete comments
        and user submissions, and block/delete accounts of users we believe
        lower the level of discourse and courtesy we strive to engender.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Moderating decisions are subjective, and we strive to make them
        carefully and consistently. Due to the volume of content, we cannot
        review moderation decisions with users and cannot reverse decisions.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Our blogs and Content are intended to serve as a discussion center for
        thoughtful users who make their own investment decisions, with or
        without the help of a broker. They are not the place for stock touters,
        cheerleaders or hypesters. We strongly encourage all participants to
        disclose any positions they have in stocks being discussed.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Without derogating from the above, Hayek editors, at their discretion,
        may refrain from posting or remove User Submissions that violate these
        standards or which are otherwise inappropriate. These standards are
        designed to ensure that the dialogue on the Site is credible,
        responsible, intelligent and informative. We cannot guarantee that users
        will tell the truth, and we will not monitor the veracity of names and
        positions or the content of any posts. However, by setting out the above
        guidelines, we hope to raise the credibility of the discussion and
        foster a spirit of open, honest exchanges of information.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        If an author has a business relationship with a company named in an
        article that he or she has authored, that relationship must be fully and
        accurately disclosed.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        If you have any comments on our policies, or complaints or concerns of
        any kind about any posts, please contact us at team@hayek.ai. We will
        review all of the information that you communicate to us, but we may not
        be able to take action or respond directly to each email.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        8. User Submissions; Online Rules of Conduct
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        When you post any User Submission on the Site or give Hayek permission
        to post your Content, you agree to:
      </Typography>
      <ul className={classes.list}>
        <li>
          Post comments in both tone and content that contribute in a positive
          and high quality manner to the substantive exchange of information and
          the subject matter of the Site.
        </li>
        <li>
          Automatically grant Hayek a royalty-free, perpetual, worldwide,
          irrevocable, non-exclusive and fully transferable and sublicensable
          right and license to use, reproduce, modify, adapt, publish,
          translate, create derivative works from, distribute, perform and
          display any User Submission (in whole or in part) and/or to
          incorporate any of your User Submission in other works now or in the
          future and in any media formats and through any media channels, and
          you confirm and warrant to Hayek that you own the copyright in each of
          your User Submissions and have all the rights, power and authority
          necessary to grant the above license and rights.
        </li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        Hayek will use commercially reasonable efforts to attribute material
        User Submissions to the author.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        If you provide any feedback or suggestions to Hayek regarding the Site
        or Hayek’s services, including without limitation in response to a
        survey or in connection with a particular User Submission (collectively,
        "Feedback"), Hayek may use such Feedback for any purpose, including
        without limitation to provide it to authors on their dashboard. In order
        that we may incorporate such Feedback into Hayek’s Site and/or services,
        Hayek alone will own all right, title and interest, including all
        related intellectual property rights, in and to all such Feedback and
        you hereby assign such Feedback to Hayek free of charge.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        When you post any User Submission on the Site, you also agree to abide
        by the following disclosure rules:
      </Typography>
      <ul className={classes.list}>
        <li>
          To disclose the existence at the time of writing of a long or short
          position (including stocks, options or other instruments) in any stock
          mentioned in any User Submission (except for "Comments").
        </li>
        <li>
          You may not write about a stock with the intention to boost or reduce
          the stock's price and sell (or buy) the stock into the resulting
          strength or weakness.
        </li>
        <li>
          If you intend at the time or writing to sell or buy a stock within
          three days of publication of a User Submission that discusses that
          stock, you must disclose this intention.
        </li>
        <li>
          Abide by the following conflict of interest rule: You will disclose
          any material relationships with companies whose stocks you write about
          in a User Submission or parties that stand to gain in any way from the
          viewpoint you are outlining. Examples: You must disclose if you are
          employed by a company whose stock you are writing about; perform
          consulting for a company you write about; receive paid advertising
          revenue or any other form of sponsorship fee from a company you write
          about. This applies to narrow asset classes as well. For example, if
          you are paid to promote a gold dealer, that must be disclosed in any
          User Submission about gold.
        </li>
        <li>
          If you choose an alias, be responsible for all statements made and
          acts or omissions that occur by use of your alias.
        </li>
        <li>
          Waive any and all rights against Hayek and hold Hayek harmless in
          connection with any claims relating to any action taken by Hayek as
          part of its investigation of a suspected violation or result of its
          conclusion that a violation of these TOU has occurred, including but
          not limited to the removal of User Submission from the Site or a
          suspension or termination of your access to the Site.
        </li>
        <li>
          Maintain and promptly update your registration data to keep it true,
          accurate, current and complete.
        </li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        You agree not to:
      </Typography>
      <ul className={classes.list}>
        <li>
          Choose an alias that is threatening, abusive, offensive, harassing,
          derisive, defamatory, vulgar, obscene, libelous, hatefully, racially,
          ethnically or otherwise or objectionable.
        </li>
        <li>
          Post or transmit any Content that you either know or should know is
          false, deceptive or misleading, or misrepresent or deceive others as
          to the source, accuracy, integrity or completeness of any comment you
          post.
        </li>
        <li>
          Post or transmit any Content that is unlawful, harmful or injurious to
          others, contains software viruses, or other harmful computer code,
          files or programs, threatening, abusive, offensive, harassing,
          derisive, defamatory, vulgar, obscene, libelous, hatefully, racially,
          ethnically or otherwise tortious or objectionable.
        </li>
        <li>
          Post or transmit any Content that does or may invade the privacy or
          violate or infringe on any rights of others, including, without
          limitation, copyrights and other intellectual property rights.
        </li>
        <li>
          By use of your alias or in any comment, impersonate any person or
          entity, falsely or deceptively state, infer or otherwise misrepresent
          your affiliation with or connection to any person or entity.
        </li>
        <li>
          Post or transmit any Content which, either the act of posting or the
          comment itself, you do not have a right to do under any law,
          regulation or order of any court, or as a result of an employment,
          contractual, fiduciary or other legal obligation or relationship.
        </li>
        <li>
          Post or transmit any advertising, promotional materials, so called
          "chain letters," "pyramid" or other schemes or invitations to
          participate in these or any other form of solicitation or promotion.
        </li>
        <li>
          Post or transmit any non-public or otherwise restricted, confidential
          or proprietary information without authorization.
        </li>
        <li>
          Violate any local, state, national or international law, regulation or
          order of any court, including but not limited to regulations of the
          U.S. Securities and Exchange Commission or any rules of any securities
          exchange, including without limitation, the New York Stock Exchange,
          the American Stock Exchange or The Nasdaq Stock Market.
        </li>
      </ul>
      <Typography variant="h5" className={classes.heading}>
        9. Caveats
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        While we believe that the Site can and should be a positive environment
        for the exchange of information, you understand that the Site is open
        for posting to all users. Some individuals may post comments that may be
        offensive, indecent, objectionable, false, misleading or simply
        inappropriate.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        10. Responsibility for User Submission
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Each individual who submits a User Submission, whether published on the
        Site or not, is solely responsible for her or his own acts, including
        the content, context or information in the User Submission he or she
        submits. This means that each individual, and not Hayek, is entirely
        responsible for anything and everything she or he posts on the Site.
        Hayek does not, and does not intend to, pre-screen any comments posted
        on its Site, and Hayek cannot and does not guarantee the accuracy,
        integrity or quality of anything that may appear on its Site.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        11. Disclosure
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        We reserve the right to access, read, preserve, and disclose any User
        Submissions (whether published or not) or any other information we
        believe is reasonably necessary to (a) comply with any applicable law,
        regulation, legal process, subpoena or governmental or regulatory
        request, (b) enforce these TOU, including investigation of potential
        violations of it, (c) detect, prevent, or otherwise address fraud,
        security or technical issues, (d) respond to user support requests, or
        (e) protect the rights, property or safety of Hayek, its users, yourself
        or the public.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        12. Disclaimer of Warranties
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        THE SITE, AND ANY PRODUCT OR SERVICE OBTAINED OR ACCESSED THROUGH THE
        SITE, IS PROVIDED "AS IS" AND WITHOUT REPRESENTATIONS OR WARRANTIES OF
        ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY
        APPLICABLE LAW, HAYEK, ITS OFFICERS, DIRECTORS, EMPLOYEES, AFFILIATES,
        SUPPLIERS, ADVERTISERS, AGENTS, INFORMATION PROVIDERS AND ANY OTHER
        THIRD PARTY INVOLVED IN OR RELATED TO THE MAKING OR COMPILING OF THE
        SITE DISCLAIM ALL WARRANTIES, EXPRESS, IMPLIED OR STATUTORY, INCLUDING,
        BUT NOT LIMITED TO, WARRANTIES OF TITLE AND NON-INFRINGEMENT, IMPLIED
        WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE, AND
        ALL WARRANTIES RELATING TO THE ORIGINALITY, ADEQUACY, ACCURACY,
        TIMELINESS, MERCHANTABILITY OR COMPLETENESS OF ANY INFORMATION ON OUR
        SITE.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Some jurisdictions do not allow the exclusion of implied warranties, so
        the above exclusions may not apply to you.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        HAYEK AND ITS AFFILIATES, SUPPLIERS, AGENTS, SPONSORS, INFORMATION
        PROVIDERS AND ANY OTHER THIRD PARTY INVOLVED IN OR RELATED TO THE MAKING
        OR COMPILING OF THE SITE DO NOT WARRANT THAT YOUR USE OF THE SITE WILL
        BE UNINTERRUPTED, ERROR-FREE OR SECURE, OR THAT THE SITE OR THE
        SERVER(S) ON WHICH THE SITE IS HOSTED ARE FREE OF VIRUSES OR OTHER
        HARMFUL COMPONENTS. YOU ASSUME TOTAL RESPONSIBILITY AND RISK FOR YOUR
        USE OF THE SITE AND YOUR RELIANCE THEREON. NO OPINION, ADVICE, OR
        STATEMENT OF HAYEK OR ITS AFFILIATES, SUPPLIERS, AGENTS, MEMBERS,
        SPONSORS, INFORMATION PROVIDERS OR VISITORS, WHETHER MADE ON THE SITE OR
        OTHERWISE, SHALL CREATE ANY WARRANTY.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        13. Limitation of Liability
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        NEITHER HAYEK NOR ITS AFFILIATES AND THEIR RESPECTIVE OFFICERS,
        DIRECTORS, EMPLOYEES, SUPPLIERS, ADVERTISERS, AGENTS, SPONSORS,
        INFORMATION PROVIDERS NOR ANY OTHER THIRD PARTY INVOLVED IN OR RELATED
        TO THE MAKING OR COMPILING OF THE SITE ARE LIABLE FOR LOST PROFITS, LOST
        SAVINGS OR ANY INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY,
        PUNITIVE OR OTHER DAMAGES UNDER ANY CONTRACT, NEGLIGENCE, STRICT
        LIABILITY OR OTHER THEORY ARISING OUT OF OR RELATING IN ANY WAY TO THE
        SITE AND/OR ANY CONTENT CONTAINED THEREIN, OR ANY PRODUCT OR SERVICE
        USED OR PURCHASED THROUGH HAYEK. SUCH LIMITATION SHALL APPLY REGARDLESS
        OF THE FORM OF ACTION, EVEN IF HAYEK, ITS INFORMATION PROVIDERS, OR ANY
        OTHER THIRD PARTY INVOLVED IN OR RELATED TO THE MAKING OR COMPILING OF
        ANY PART OF THE SITE HAS BEEN ADVISED OF OR OTHERWISE MIGHT HAVE
        ANTICIPATED THE POSSIBILITY OF SUCH DAMAGES. YOUR SOLE REMEDY FOR
        DISSATISFACTION WITH THE SITE IS TO STOP USING IT. THE SOLE AND
        EXCLUSIVE MAXIMUM LIABILITY TO HAYEK FOR ALL DAMAGES, LOSSES, AND CAUSES
        OF ACTION (WHETHER IN CONTRACT, TORT (INCLUDING, WITHOUT LIMITATION,
        NEGLIGENCE), OR OTHERWISE) SHALL NOT EXCEED THE TOTAL AMOUNT PAID TO US
        BY YOU, IF ANY, FOR ACCESS TO THE SITE OR ANY SERVICES, DURING THE
        PREVIOUS SIX (6) MONTHS PRIOR TO BRINGING THE CLAIM. IN NO EVENT SHALL
        HAYEK, ITS INFORMATION PROVIDERS OR ANY THIRD PARTY INVOLVED IN OR
        RELATED TO THE MAKING OR COMPILING OF ANY OF THE GICS SERVICE (DEFINED
        BELOW), BE LIABLE TO YOU, OR ANY OTHER PERSON, FOR ANY DIRECT OR
        INDIRECT DAMAGES, INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, LOST
        SAVINGS OR OTHER INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
        USE OR YOUR INABILITY TO USE THE GICS SERVICE.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Some jurisdictions do not allow the limitation or exclusion of liability
        for incidental or consequential damages, so the above limitations may
        not apply to you.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        14. Indemnification
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        As a condition of your use of the Site, you agree to indemnify, defend
        and hold us, our officers, directors, employees, agents,
        representatives, information providers, and any other third party
        involved in or related to the making or compiling of the Site harmless
        from and against any and all claims, damages, losses, costs (including
        reasonable attorneys' fees), or other expenses that arise directly or
        indirectly out of or from (a) your violation of the TOU; (b) your use or
        any third party’s use of, or inability to use, the Site; (c) your
        violation of the rights of any third party, or (d) any claim that one of
        your User Submissions caused damage to a third party. This defense and
        indemnification obligation will survive these TOU and your use of the
        Site.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        15. Termination
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        You understand and agree that Hayek may, under certain circumstances and
        without prior notice to you, terminate your access to and use of the
        Site. Cause for such termination shall include, but not be limited to,
        (i) breaches or violations of the TOU or other agreements or guidelines,
        (ii) requests by law enforcement or other government or regulatory
        authorities or (iii) repeat violators of third party copyrights or other
        intellectual property.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        16. Copyright Policy
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        Hayek respects the intellectual property of others, and we ask our users
        to do the same. Hayek may, in appropriate circumstances and at its
        discretion, terminate the account or access of users who infringe the
        intellectual property rights of others.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        If you believe that your work has been copied in a way that constitutes
        copyright infringement, please provide our Copyright Agent the following
        information:
      </Typography>
      <ul className={classes.list}>
        <li>
          16.1: an electronic or physical signature of the person authorized to
          act on behalf of the owner of the copyright interest;
        </li>
        <li>
          16.2: a description of the copyrighted work that you claim has been
          infringed, including the URL (web page address) of the location where
          the copyrighted work exists or a copy of the copyrighted work;
        </li>
        <li>
          16.3: a description of where the material that you claim is infringing
          is located on the Site, including the URL;
        </li>
        <li>16.4: your address, telephone number, and email address;</li>
        <li>
          16.5: a statement by you that you have a good faith belief that the
          disputed use is not authorized by the copyright owner, its agent, or
          the law; and
        </li>
        <li>
          16.6: a statement by you, made under penalty of perjury, that the
          above information in your Notice is accurate and that you are the
          copyright owner or authorized to act on the copyright owner's behalf.
        </li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        Hayek's Copyright Agent for Notice of claims of copyright infringement
        can be reached as follows:
      </Typography>
      <ul className={classes.list}>
        <li>By phone: 732-977-3873</li>
        <li>By email: team@hayek.ai</li>
      </ul>
      <Typography variant="body1" className={classes.paragraph}>
        Please also note that under Section 512(f) any person who knowingly
        materially misrepresents that material or activity is infringing may be
        subject to liability.
      </Typography>
      <Typography variant="h5" className={classes.heading}>
        17. Additional Terms that Apply to Hayek's iPhone® Mobile Application
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        By downloading Hayek's mobile application on your iPhone® mobile device
        (the "Licensed Application"), your use of the Licensed Application is
        also subject to the Usage Rules established by Apple, including those
        set forth in the Apple App Store Terms of Service, effective as of the
        date that you download the Licensed Application. In addition, you agree
        to the following terms:
      </Typography>
      <ul className={classes.list}>
        <li>
          You acknowledge that this TOU is entered into by and between you and
          Hayek exclusively and not with Apple, Inc. or its subsidiaries
          ("Apple").
        </li>
        <li>
          Any appearance of the word "Site" in the TOU is also intended, where
          appropriate, to include a reference to the Licensed Application.
        </li>
        <li>
          As between Hayek and Apple, we are exclusively responsible for the
          Licensed Application and its content, unless specifically noted
          otherwise in the TOU,
        </li>
        <li>
          Hayek grants you a nontransferable, nonexclusive, royalty-free, fully
          paid, worldwide license (without the right to sublicense) to install
          and use one copy of the Licensed Application, in executable object
          code format only, solely on your iPhone® mobile device.
        </li>
        <li>
          Except as required by applicable law, you acknowledge that neither
          Hayek nor Apple are obligated to maintain or support the Licensed
          Application. Notwithstanding the foregoing, from time to time, we may
          provide updates or upgrades to the Licensed Application (each a
          "Revision"), but we are not under any obligation to do so. Such
          Revisions will be supplied according to Hayek's then-current policies,
          which may include automatic updating or upgrading without any
          additional notice to you. You consent to any such automatic updating
          or upgrading of the Licensed Application. All references herein to the
          Licensed Application shall include Revisions. This TOU shall govern
          any Revisions that replace or supplement the original Licensed
          Application unless the Revision is accompanied by a separate license
          agreement which will govern the Revision.
        </li>
        <li>
          Currently, we do not charge for your use of the Licensed Application,
          however, your use of the Licensed Application requires and utilizes
          internet connection or data access. To the extent that a third party
          service provider or carrier charges for your internet or data usage,
          you agree to be solely responsible for those charges.
        </li>
        <li>
          In the event of any failure of the Licensed Application to conform to
          any applicable warranty provided herein, you may notify Apple, and
          Apple will refund the purchase price, if any, for the Licensed
          Application to you. Furthermore, to the maximum extent permitted by
          applicable law, Apple will have no other warranty obligation
          whatsoever with respect to the Licensed Application, and any other
          claims, losses, liabilities, damages, costs or expenses attributable
          to any failure of the Licensed Application to conform to any warranty.
        </li>
        <li>
          To the extent that a claim is permitted pursuant to this TOU, Hayek,
          and not Apple, is responsible for addressing your claims or those of
          any third party relating to the Licensed Application or your
          possession and/or use of the Licensed Application, including, but not
          limited to: (i) product liability claims; (ii) any claim that the
          Licensed Application fails to conform to any applicable legal or
          regulatory requirement; and (iii) claims arising under consumer
          protection or similar legislation. Similarly, if there is a third
          party claim that the Licensed Application or Your possession and use
          of the Licensed Application infringes a third party's intellectual
          property rights, Hayek, not Apple, will be solely responsible for the
          investigation, defense, settlement and discharge of any such
          intellectual property infringement claim.
        </li>
        <li>
          You represent and warrant that (i) You are not located in a country
          that is subject to a U.S. Government embargo or that has been
          designated by the U.S. Government as a "terrorist supporting" country;
          and (ii) You are not listed on any U.S. Government list of prohibited
          or restricted parties.
        </li>
        <li>
          Apple is an intended third-party beneficiary of this Section 17,
          Additional Terms. You acknowledge that Apple will have the right (and
          will be deemed to have accepted the right) to enforce any of the terms
          or conditions of this Section 17 against you as a third-party
          beneficiary of this Section 17.
        </li>
      </ul>
      <Typography variant="h5" className={classes.heading}>
        18. Additional Terms that Apply to Hayek Paid Subscriptions
      </Typography>
      <ul className={classes.list}>
        <li>
          By subscribing to Hayek subscription products (the “Subscription”),
          you agree to pay the applicable Subscription fees set forth on the
          Site. Hayek reserves the right to revise Subscription fees upon
          reasonable notice.
        </li>
        <li>
          We remind you that all the rules applicable to setting up an account
          under Section 6 above (entitled, "User Conduct") apply to your
          Subscriptions.
        </li>
        <li>
          Unless we notify you in writing otherwise, you are not permitted to
          share Content available through your Subscriptions.
        </li>
        <li>
          Unless stated otherwise in writing, Subscription fees are
          nonrefundable.
        </li>
        <li>
          Hayek reserves the right to cancel a Subscription at any time. If we
          cancel a Subscription due to a breach of these Terms of Use you will
          not be eligible for any refund.
        </li>
      </ul>
      <Typography variant="h5" className={classes.heading}>
        19. Miscellaneous
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        The Site is directed solely to individuals residing in jurisdictions in
        which provision of the Site's content is legal. We make no
        representation that materials provided on the Site are appropriate or
        available for use in other locations. Those who choose to access the
        Site from other locations do so on their own initiative and at their own
        risk, and are responsible for compliance with local laws, if and to the
        extent applicable. We reserve the right to limit the availability of the
        Site to any person, geographic area, or jurisdiction we so desire, at
        any time and in our sole discretion, and to limit the quantities of any
        such service or product that we provide.
      </Typography>
      <Typography variant="body1" className={classes.paragraph}>
        The TOU, together with all Hayek policies referred to herein,
        constitutes the entire agreement between you and Hayek relating to your
        use of the Site and supersedes and any all prior or contemporaneous
        written or oral agreements on that subject between us. The TOU, privacy
        policy and the relationship between you and Hayek are governed by and
        construed in accordance with the laws of the State of New York, without
        regard to its principles of conflict of laws. You and Hayek agree to
        submit to the personal and exclusive jurisdiction of the federal and
        state courts located within New York County, New York, and waive any
        jurisdictional, venue, or inconvenient forum objections to such courts.
        If any provision of the TOU is found to be unlawful, void, or for any
        reason unenforceable, then that provision shall be deemed severable from
        the TOU and shall not affect the validity and enforceability of any
        remaining provisions. No waiver by either party of any breach or default
        hereunder shall be deemed to be a waiver of any preceding or subsequent
        breach or default. Any heading, caption or section title contained in
        the TOU is inserted only as a matter of convenience and in no way
        defines or explains any section or provision hereof. We reserve the
        right to require you to sign a non-electronic version of the TOU.
      </Typography>
    </FullPageLayout>
  );
};

export default TermsOfUse;
