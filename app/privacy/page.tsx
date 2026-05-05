'use client'
import { useLanguage } from '@/hooks/useLanguage'

export default function PrivacyPage() {
  const { lang } = useLanguage()

  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-v) var(--gutter)' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: '40px' }}>
            {lang === 'en' ? 'Privacy Policy' : 'Политика конфиденциальности'}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--fg-2)', lineHeight: 1.75 }}>
            {lang === 'en'
              ? 'MTDev collects only the information you provide through the contact form. We do not share your data with third parties. Data is used solely to respond to your project inquiry.'
              : 'MTDev собирает только ту информацию, которую вы предоставляете через контактную форму. Мы не передаём ваши данные третьим лицам. Данные используются исключительно для ответа на ваш запрос.'}
          </p>
        </div>
      </section>
    </div>
  )
}
