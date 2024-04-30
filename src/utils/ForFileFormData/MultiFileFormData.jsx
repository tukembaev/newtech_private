
const MultiFileFormData = ({ setMulti_File }) => {
  const handleFileUpload = (event) => {
    const uploadedFiles = event.target.files
    const formData = new FormData()

    for (let i = 0; i < uploadedFiles.length; i++) {
      formData.append(`file${i}`, uploadedFiles[i])
    }

    setMulti_File(formData)
  }

  return (
    <form>
      <input type="file" multiple onChange={handleFileUpload} />
      <button type="submit">Загрузить</button>
    </form>
  )
}

export default MultiFileFormData
