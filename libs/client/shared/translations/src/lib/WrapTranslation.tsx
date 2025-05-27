import { LocalizedString } from 'typesafe-i18n';

interface WrapTranslationPropsType {
  message: LocalizedString;
  renderComponent: (messagePart: LocalizedString) => Element;
}

export function WrapTranslation({
  message,
  renderComponent,
}: WrapTranslationPropsType) {
  let prefix: LocalizedString, infix: LocalizedString;
  const [p, i, postfix] = message.split('<>') as LocalizedString[];
  prefix = p;
  infix = i;

  // render infix only if the message doesn't have any split characters
  if (!infix && !postfix) {
    infix = prefix;
    prefix = '' as LocalizedString;
  }

  return (
    <>
      {prefix}
      {renderComponent(infix)}
      {postfix}
    </>
  );
}
