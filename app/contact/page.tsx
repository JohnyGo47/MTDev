'use client'
import { useState } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { t } from '@/lib/i18n'
import { SectionLabel } from '@/components/ui/SectionLabel'

interface FormData {
  name: string
  company: string
  desc: string
  budget: string
}

interface FormErrors {
  name?: string
  company?: string
  desc?: string
  budget?: string
}

export default function ContactPage() {
  const { lang } = useLanguage()
  const [form, setForm] = useState<FormData>({ name: '', company: '', desc: '', budget: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = t.contact.errors.required[lang]
    if (!form.company.trim()) errs.company = t.contact.errors.required[lang]
    if (!form.desc.trim()) errs.desc = t.contact.errors.required[lang]
    if (!form.budget.trim()) errs.budget = t.contact.errors.required[lang]
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      setSent(true)
    } catch {
      // silent
    } finally {
      setSending(false)
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-2)',
    border: '0.5px solid var(--border)',
    borderRadius: '4px',
    padding: '14px 16px',
    fontSize: '15px',
    color: 'var(--fg)',
    fontFamily: 'var(--font-geist), sans-serif',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '11px',
    fontFamily: 'var(--font-geist-mono), monospace',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--fg-2)',
    marginBottom: '8px',
  }

  return (
    <div style={{ paddingTop: '56px', minHeight: '100vh' }}>
      <section style={{ padding: 'var(--section-v) var(--gutter)' }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <SectionLabel>{t.contact.label[lang]}</SectionLabel>
          <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, letterSpacing: '-0.02em', marginTop: '16px', marginBottom: '16px' }}>
            {t.contact.headline[lang]}
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--fg-2)', lineHeight: 1.65, marginBottom: '52px' }}>
            {t.contact.sub[lang]}
          </p>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.16em', marginBottom: '16px' }}>
                ✓
              </div>
              <p style={{ fontSize: '16px', color: 'var(--fg-2)' }}>{t.contact.note[lang]}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: 'grid', gap: '24px' }}>
                {(
                  [
                    { key: 'name', label: t.contact.fields.name[lang] },
                    { key: 'company', label: t.contact.fields.company[lang] },
                    { key: 'budget', label: t.contact.fields.budget[lang] },
                  ] as const
                ).map(({ key, label }) => (
                  <div key={key}>
                    <label htmlFor={key} style={labelStyle}>{label}</label>
                    <input
                      id={key}
                      type="text"
                      value={form[key]}
                      onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: undefined }) }}
                      style={{ ...fieldStyle, borderColor: errors[key] ? 'var(--orange)' : 'var(--border)' }}
                    />
                    {errors[key] && <p style={{ fontSize: '11px', color: 'var(--orange)', marginTop: '6px' }}>{errors[key]}</p>}
                  </div>
                ))}

                <div>
                  <label htmlFor="desc" style={labelStyle}>{t.contact.fields.desc[lang]}</label>
                  <textarea
                    id="desc"
                    value={form.desc}
                    rows={5}
                    onChange={(e) => { setForm({ ...form, desc: e.target.value }); setErrors({ ...errors, desc: undefined }) }}
                    style={{ ...fieldStyle, resize: 'vertical', borderColor: errors.desc ? 'var(--orange)' : 'var(--border)' }}
                  />
                  {errors.desc && <p style={{ fontSize: '11px', color: 'var(--orange)', marginTop: '6px' }}>{errors.desc}</p>}
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={sending}
                    style={{
                      background: 'var(--orange)',
                      color: '#fff',
                      border: 'none',
                      padding: '14px 32px',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      cursor: 'none',
                      opacity: sending ? 0.7 : 1,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {t.contact.submit[lang]}
                  </button>
                  <p style={{ fontSize: '12px', color: 'var(--fg-2)', marginTop: '16px' }}>
                    {t.contact.note[lang]}
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
