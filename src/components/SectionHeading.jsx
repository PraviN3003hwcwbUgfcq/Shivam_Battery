import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, text, action, center = false, as: Tag = 'h2' }) {
  const classes = ['section-head', center && 'section-head--center', action && 'section-head--row']
  return (
    <Reveal className={classes.filter(Boolean).join(' ')}>
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <Tag>{title}</Tag>
        {text && <p>{text}</p>}
      </div>
      {action}
    </Reveal>
  )
}
