import styles from './PdfPreview.module.scss'

const PdfPreview = ({ file }) => {
  return <iframe className={styles.frame} src={file} />
}

export default PdfPreview
