const supportsAdopted =
  'adoptedStyleSheets' in Document.prototype && 'replaceSync' in CSSStyleSheet.prototype;

export function applyScopedStyles(shadow: ShadowRoot, cssText: string): HTMLStyleElement | null {
  if (supportsAdopted) {
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(cssText);
    shadow.adoptedStyleSheets = [...shadow.adoptedStyleSheets, sheet];
    return null;
  }

  const style = document.createElement('style');
  style.textContent = cssText;
  shadow.append(style);
  return style;
}
