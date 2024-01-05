export const ROWS_PER_PAGE_OPTIONS = [5, 10, 15, 25, 50];
export const DEFAULT_ROWS_PER_PAGE = ROWS_PER_PAGE_OPTIONS[1];

export const HUBSPOT_FORMS_TABLE = 'HUBSPOT_FORMS_TABLE';

export const Colors = {
    primary: '#0C485E',
    red: '#DB3A34',
    yellow: '#FF9F1C',
    green: '#4C956C',
    gray: '#eaeaea',
};

export type ColorKey = keyof typeof Colors;

export const embedScript = (region?: string, portalId?: string, formId?: string) => `<script 
    charSet="utf-8" 
    type="text/javascript" 
    src="//js-${region}.hsforms.net/forms/embed/v2.js"
  ></script>
  <script>
    hbspt.forms.create({
      region: "${region}",
      portalId: "${portalId}",
      formId: "${formId}",
      onBeforeFormSubmit:(e,s)=>{let i="";s.forEach(e=>{"email"===e.name&&(i=e.value)}),fetch("/wp-json/digtective/v1/form-submission",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:i,sessionId:sessionStorage.getItem("sessionId")})})},
    });
  </script>
`;
