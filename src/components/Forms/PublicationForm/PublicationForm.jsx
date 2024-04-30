import { Button } from 'components'
import { useEffect, useState } from 'react'
import styles from './PublicationForm.module.scss'

import { TextareaAutosize } from '@mui/material'
import Country from 'components/Country/Country'
import SimpleDropdown from 'components/SimpleDropdown/SimpleDropdown'
import EmployeeSelectAllUserId from 'hooks/EmployeeSelect/EmployeeSelectAllUserId'
import ButtonLoader from 'hooks/UseLoading/ButtonLoader'
import {
    patchPublicationInfo,
    postPublications,
} from 'service/PublicationService'
import Notification from 'utils/Notifications'


function PublicationForm({ setRender, setState }) {
  //UseState

  const [id, setId] = useState('')
  const [type, setType] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [link, setLink] = useState('')
  const [doi, setDoi] = useState('')
  const [issn, setIssn] = useState('')
  const [isni, setIsni] = useState('')
  const [wikipedia_url, setWiki] = useState('')
  const [wikidata, setWikiData] = useState('')
  const [eid, setEid] = useState('')
  const [published, setDateCreate] = useState('')
  const [country, setCountry] = useState('')
  const [file, setFile] = useState('')
  const [authors, setSelectedEmployee] = useState([])
  //Const & Lets

  const [loading, setLoading] = useState(false)
  const [addExtra, setAddExtra] = useState({
    Doi: false,
    Issn: false,
    Isni: false,
    Wiki: false,
    WikiData: false,
  })
  const [options, setOptions] = useState([
    'DOI',
    'ISSN',
    'ISNI',
    'WikipediaURL',
    'WikiData',
  ])
  const [selected, setSelected] = useState('')
  const onFileChange = (e) => {
    setFile(e.target.files[0])
  }

  //Notifications
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  })

  const getUserIdArray = (data) => {
    const userIdArray = data.map((item) => item.user_id)
    return userIdArray
  }
  const handleSubmit = async (event) => {
    event.preventDefault()

    if (title === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не написали заголовок публикации',
        type: 'warning',
        sound: 'warning',
      })
    } else if (type === '') {
      setNotify({
        isOpen: true,
        message: 'Вы не выбрали вид публикации',
        type: 'warning',
        sound: 'warning',
      })
    } else if (link === '' && file === '') {
      setNotify({
        isOpen: true,
        message: 'Ссылка или файл обязательны',
        type: 'warning',
        sound: 'warning',
      })
    } else {
      try {
        let user_id_authors = getUserIdArray(authors)

        let response = await postPublications(
          title,
          description,
          type,
          link,
          doi,
          issn,
          eid,
          isni,
          wikipedia_url,
          wikidata,
          country,
          published,
          user_id_authors,
        )

        let response2 = await patchPublicationInfo(response.data.id, {
          file: file,
        })

        setNotify({
          isOpen: true,
          message: 'Успешно опубликовано',
          type: 'success',
          sound: 'success',
        })
        setState({ isPaneOpen: false })
        setRender(true)
      } catch (error) {
        console.log(error.response)
        setNotify({
          isOpen: true,
          message: 'Ошибка',
          type: 'error',
          sound: 'error',
        })
      }
    }
  }
  useEffect(() => {
    if (selected === 'DOI') {
      setAddExtra({ ...addExtra, Doi: true })
      setSelected('')
    } else if (selected === 'ISSN') {
      setAddExtra({ ...addExtra, Issn: true })
      setSelected('')
    } else if (selected === 'ISNI') {
      setAddExtra({ ...addExtra, Isni: true })
      setSelected('')
    } else if (selected === 'WikipediaURL') {
      setAddExtra({ ...addExtra, Wiki: true })
      setSelected('')
    } else if (selected === 'WikiData') {
      setAddExtra({ ...addExtra, WikiData: true })
      setSelected('')
    }
  }, [selected])

  return (
    <div>
      <div className={styles.qr_wrapper}>
        <div className={styles.qr_body}>
          <div className={styles.qr_inputs}>
            <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>
                  Вид <span className={styles.required_img}>*</span>
                </h3>
              </div>
              <TextareaAutosize
                id="type"
                name="type"
                className={styles.discription_input}
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Вид:"
              />
            </div>
            <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>
                  Заголовок <span className={styles.required_img}>*</span>
                </h3>
              </div>
              <TextareaAutosize
                id="text"
                name="text"
                className={styles.discription_input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Заголовок:"
              />
            </div>
            <div className={styles.flex__wrap}>
              <h3>Краткое описание</h3>
              <TextareaAutosize
                id="description"
                name="description"
                className={styles.discription_input}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Краткое описание"
                maxLength={2000}
              />
            </div>
            <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>
                  Ссылка <span style={{ color: 'orange' }}>*</span>
                </h3>
              </div>
              <TextareaAutosize
                id="link"
                name="link"
                className={styles.discription_required}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Ссылка"
              />
            </div>
            {addExtra?.Doi ? (
              <>
                <div className={styles.flex__wrap}>
                  <h3>DOI</h3>
                  <TextareaAutosize
                    id="DOI"
                    name="DOI"
                    className={styles.discription_input}
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    placeholder="DOI"
                  />
                </div>
              </>
            ) : null}
            {addExtra?.Issn ? (
              <>
                <div className={styles.flex__wrap}>
                  <h3>ISSN</h3>
                  <TextareaAutosize
                    id="ISSN"
                    name="ISSN"
                    className={styles.discription_input}
                    value={issn}
                    onChange={(e) => setIssn(e.target.value)}
                    placeholder="ISSN"
                  />
                </div>
              </>
            ) : null}
            {addExtra?.Isni ? (
              <>
                <div className={styles.flex__wrap}>
                  <h3>ISNI</h3>
                  <TextareaAutosize
                    id="ISNI"
                    name="ISNI"
                    className={styles.discription_input}
                    value={isni}
                    onChange={(e) => setIsni(e.target.value)}
                    placeholder="ISNI"
                  />
                </div>
              </>
            ) : null}
            {addExtra?.Wiki ? (
              <>
                <div cl assName={styles.flex__wrap}>
                  <h3>Wiki</h3>
                  <TextareaAutosize
                    id="Wiki"
                    name="Wiki"
                    className={styles.discription_input}
                    value={wikipedia_url}
                    onChange={(e) => setWiki(e.target.value)}
                    placeholder="WikipediaURL"
                  />
                </div>
              </>
            ) : null}
            {addExtra?.WikiData ? (
              <>
                <div className={styles.flex__wrap}>
                  <h3>WikiData</h3>
                  <TextareaAutosize
                    id="Wiki"
                    name="Wiki"
                    className={styles.discription_input}
                    value={wikidata}
                    onChange={(e) => setWikiData(e.target.value)}
                    placeholder="WikiData"
                  />
                </div>
              </>
            ) : null}
            <div className={styles.flex__wrap}>
              <h3>Дополнительные поля</h3>
              <SimpleDropdown
                selected={selected}
                setSelected={setSelected}
                title={' Выберите дополнительные поля'}
                options={options}
              />
            </div>
            <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Страна </h3>
              </div>
              <Country title={'Страна'} setStateCountry={setCountry} />
            </div>

            <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>Дата издания </h3>
              </div>
              <input
                type="date"
                placeholder="Дата создания"
                className={styles.discription_input}
                onChange={(e) => setDateCreate(e.target.value)}
              />
            </div>

            <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>
                  Авторы <span className={styles.required_img}>*</span>
                </h3>
              </div>
              <EmployeeSelectAllUserId
                selectedEmployee={setSelectedEmployee}
                placehold={'Выберите издателя'}
                isMulti={true}
              />
            </div>

            <div className={styles.flex__wrap}>
              <div className={styles.requiredField}>
                <h3>
                  Файл <span style={{ color: 'orange' }}>*</span>
                </h3>
              </div>
              <input
                type="file"
                name="file_upload"
                accept="application/pdf"
                onChange={onFileChange}
                className={styles.file_padding_left}
              />
            </div>
          </div>
          <div className={styles.qr_footer}>
            <ButtonLoader color={'white'} loading={loading} position={'center'}>
              <Button className={styles.btn1} onClick={handleSubmit}>
                Отправить
              </Button>{' '}
            </ButtonLoader>
          </div>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  )
}

export default PublicationForm
