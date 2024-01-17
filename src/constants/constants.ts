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

export const embedScript = (region?: string, portalId?: string, formId?: string) => () => {
    const givenRegion = region && (region.length > 3 ? 'na1' : region);
    const src = region && (region.length > 3 ? "//js.hsforms.net/forms/embed/v2.js" : `//js-${region}.hsforms.net/forms/embed/v2.js`);

    return `<script 
    charSet="utf-8" 
    type="text/javascript" 
    src={src}
  ></script>
  <script>
    hbspt.forms.create({
      region: "${givenRegion}",
      portalId: "${portalId}",
      formId: "${formId}"
    });
  </script>
`;}
