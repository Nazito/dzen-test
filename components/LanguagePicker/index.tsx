import { useRouter } from 'next/router';
import { Dropdown } from 'react-bootstrap';

import { getLangNameByLocale } from '@/utils/getLangNameByLocale';

const LanguagePicker = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale, locales } = router;

  const handleSelectOption = (eventKey: string | null) => {
    void router.push({ pathname, query }, asPath, { locale: eventKey as string });
  };

  const options =
    locales?.map((lang) => {
      return { value: lang, label: getLangNameByLocale(lang) };
    }) ?? [];

  return (
    <Dropdown onSelect={handleSelectOption}>
      <Dropdown.Toggle>{getLangNameByLocale(locale)}</Dropdown.Toggle>
      <Dropdown.Menu>
        {options.map((option) => (
          <Dropdown.Item key={option.value} eventKey={option.value}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default LanguagePicker;
