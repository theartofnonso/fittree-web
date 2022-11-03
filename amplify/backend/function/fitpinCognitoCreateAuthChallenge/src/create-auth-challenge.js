const AWS = require('aws-sdk');

const SES = new AWS.SES();

// ${event.request.userAttributes.email.split('@')[0]}
// ${secretLoginCode}

/**
 * Generate passwordless sign-in OTP and send to subscriber
 * @param {AWS Lambda Event} event
 */
exports.handler = async event => {
  let secretLoginCode;
  if (!event.request.session || !event.request.session.length) {
    // Generate a new secret login code and send it to the subscriber
    secretLoginCode = Date.now().toString().slice(-4);

    await SES.sendEmail({
      Destination: {ToAddresses: [event.request.userAttributes.email]},
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: `
<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!-->
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <!--<![endif]-->
  <title></title>

  <style type="text/css">
      @media only screen and (min-width: 620px) {
          .u-row {
              width: 600px !important;
          }
          .u-row .u-col {
              vertical-align: top;
          }
          .u-row .u-col-100 {
              width: 600px !important;
          }
      }

      @media (max-width: 620px) {
          .u-row-container {
              max-width: 100% !important;
              padding-left: 0px !important;
              padding-right: 0px !important;
          }
          .u-row .u-col {
              min-width: 320px !important;
              max-width: 100% !important;
              display: block !important;
          }
          .u-row {
              width: calc(100% - 40px) !important;
          }
          .u-col {
              width: 100% !important;
          }
          .u-col>div {
              margin: 0 auto;
          }
      }

      body {
          margin: 0;
          padding: 0;
      }

      table,
      tr,
      td {
          vertical-align: top;
          border-collapse: collapse;
      }

      p {
          margin: 0;
      }

      .ie-container table,
      .mso-container table {
          table-layout: fixed;
      }

      * {
          line-height: inherit;
      }

      a[x-apple-data-detectors='true'] {
          color: inherit !important;
          text-decoration: none !important;
      }

      table,
      td {
          color: #000000;
      }

      #u_body a {
          color: #ef7a75;
          text-decoration: underline;
      }
  </style>



  <!--[if !mso]><!-->
  <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet" type="text/css">
  <!--<![endif]-->

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #ffffff;color: #000000">
<!--[if IE]><div class="ie-container"><![endif]-->
<!--[if mso]><div class="mso-container"><![endif]-->
<table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #ffffff;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->


      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
              <div style="height: 100%;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <!--<![endif]-->

                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:'Lato',sans-serif;" align="left">

                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td style="padding-right: 0px;padding-left: 0px;" align="center">

                              <img align="center" border="0" src="https://d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/brand-kit/fittree_logo_transparent.png" alt="Image" title="Image" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 15%;max-width: 90px;"
                                   width="90" />

                            </td>
                          </tr>
                        </table>

                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>



      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ef7a75;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ef7a75;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
              <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <!--<![endif]-->

                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">

                        <div style="color: #e5eaf5; line-height: 140%; text-align: center; word-wrap: break-word;">
                          <p style="font-size: 14px; line-height: 140%;"><span style="color: #000000; font-size: 14px; line-height: 19.6px;"><strong>T H A N K S   F O R   S I G N I N G   U P !</strong></span></p>
                        </div>

                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px 31px;font-family:'Lato',sans-serif;" align="left">

                        <div style="color: #ffffff; line-height: 140%; text-align: center; word-wrap: break-word;">
                          <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 28px; line-height: 39.2px; color: #000000;"><strong><span style="line-height: 39.2px; font-size: 28px;">Verify Your E-mail Address </span></strong>
                                  </span>
                          </p>
                        </div>

                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>



      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
              <div style="height: 100%;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <!--<![endif]-->

                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:33px 55px;font-family:'Lato',sans-serif;" align="left">

                        <div style="line-height: 160%; text-align: center; word-wrap: break-word;">
                          <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 22px; line-height: 35.2px;">Hi ${event.request.userAttributes.email.split('@')[0]}, </span></p>
                          <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">You have requested to verify your email for Fittree!</span></p>
                          <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 18px; line-height: 28.8px;">This is your secret login code: <strong>${secretLoginCode} </strong></span></p>
                        </div>

                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>



      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f5ede8;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f5ede8;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
              <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <!--<![endif]-->

                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:41px 55px 18px;font-family:'Lato',sans-serif;" align="left">

                        <div style="color: #ef7a75; line-height: 160%; text-align: center; word-wrap: break-word;">
                          <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 20px; line-height: 32px; color: #ef7a75;"><strong>Get in touch</strong></span></p>
                          <p style="font-size: 14px; line-height: 160%;"><span style="font-size: 16px; line-height: 25.6px; color: #000000;">hello@fittree.io</span></p>
                        </div>

                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 33px;font-family:'Lato',sans-serif;" align="left">

                        <div align="center">
                          <div style="display: table; max-width:97px;">
                            <!--[if (mso)|(IE)]><table width="97" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-collapse:collapse;" align="center"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse; mso-table-lspace: 0pt;mso-table-rspace: 0pt; width:97px;"><tr><![endif]-->


                            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 17px;" valign="top"><![endif]-->
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 17px">
                              <tbody>
                              <tr style="vertical-align: top">
                                <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                  <link href="https://instagram.com/fittree.io" title="Instagram" target="_blank">
                                    <img src="https://d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/socials/instagram-line.png" alt="Instagram" title="Instagram" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                  </link>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <!--[if (mso)|(IE)]></td><![endif]-->

                            <!--[if (mso)|(IE)]><td width="32" style="width:32px; padding-right: 0px;" valign="top"><![endif]-->
                            <table align="left" border="0" cellspacing="0" cellpadding="0" width="32" height="32" style="width: 32px !important;height: 32px !important;display: inline-block;border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;margin-right: 0px">
                              <tbody>
                              <tr style="vertical-align: top">
                                <td align="left" valign="middle" style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
                                  <link href="https://twitter.com/fittreeio" title="Twitter" target="_blank">
                                    <img src="https://d2ez6lox3k9lt0.cloudfront.net/public/fitpin-public/socials/twitter-line.png" alt="Twitter" title="Twitter" width="32" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: block !important;border: none;height: auto;float: none;max-width: 32px !important">
                                  </link>
                                </td>
                              </tr>
                              </tbody>
                            </table>
                            <!--[if (mso)|(IE)]></td><![endif]-->


                            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                          </div>
                        </div>

                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>



      <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ef7a75;">
          <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ef7a75;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100" style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
              <div style="height: 100%;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div style="height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                  <!--<![endif]-->

                  <table style="font-family:'Lato',sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                    <tbody>
                    <tr>
                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Lato',sans-serif;" align="left">

                        <div style="color: #fafafa; line-height: 180%; text-align: center; word-wrap: break-word;">
                          <p style="font-size: 14px; line-height: 180%;"><em>Your workouts everywhere, on any device</em></p>
                        </div>

                      </td>
                    </tr>
                    </tbody>
                  </table>

                  <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
              </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
          </div>
        </div>
      </div>


      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
</table>
<!--[if mso]></div><![endif]-->
<!--[if IE]></div><![endif]-->
</body>

</html>

`,
          },
          Text: {
            Charset: 'UTF-8',
            Data: `Your secret login code: ${secretLoginCode}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Fittree Verification Code: ${secretLoginCode}`,
        },
      },
      Source: 'Fittree Verify <hello@fittree.io>',
    }).promise();
  } else {
    // re-use code generated in previous challenge
    const previousChallenge = event.request.session.slice(-1)[0];
    secretLoginCode =
      previousChallenge.challengeMetadata.match(/CODE-(\d*)/)[1];
  }

  // Add the secret login code to the private challenge parameters
  // so it can be verified by the "Verify Auth Challenge Response" trigger
  event.response.privateChallengeParameters = {secretLoginCode};

  // Add the secret login code to the session so it is available
  // in a next invocation of the "Create Auth Challenge" trigger
  event.response.challengeMetadata = `CODE-${secretLoginCode}`;

  return event;
};
