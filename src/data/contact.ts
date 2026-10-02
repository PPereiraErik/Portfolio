import type { ContactLink } from './types'

export const githubProfile = 'https://github.com/PPereiraErik'
export const linkedinProfile = 'https://www.linkedin.com/in/erik-pinheiro-715589374/'
export const email = 'erikpinheiro2222@gmail.com'

export const contacts: ContactLink[] = [
  { id: 'email', label: 'E-mail', value: email, href: `mailto:${email}`, external: false },
  {
    id: 'phone',
    label: 'Telefone',
    value: '(47) 99683-9939',
    note: 'Ligações',
    href: 'tel:+5547996839939',
    external: false,
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '(35) 98405-5215',
    note: 'Somente mensagens',
    href: 'https://wa.me/5535984055215',
    external: true,
  },
  { id: 'linkedin', label: 'LinkedIn', value: 'erik-pinheiro', href: linkedinProfile, external: true },
  { id: 'github', label: 'GitHub', value: 'PPereiraErik', href: githubProfile, external: true },
]
