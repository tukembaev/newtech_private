import font from 'assets/fonts/times.ttf'
import sign from 'assets/icons/sign.jpg'
import {
  PDFDocument
} from 'pdf-lib'

import fontkit from '@pdf-lib/fontkit'

export const AddWaterMark = async ({
  name,
  type,
  count_turn,
  file,
  finalWaterMarks,
  order_date,
  order_number,
}) => {
  function blobToBytes(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        const buffer = new Uint8Array(reader.result)
        resolve(buffer)
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(blob)
    })
  }
  try {
    if (finalWaterMarks) {
      const response = await fetch(file)
        .then((res) => res.blob())
        .then((blob) => {
          return blobToBytes(blob)
        })

      const pdfDoc = await PDFDocument.load(response)

      const firstPage = pdfDoc.getPage(0)

      const fontArrayBuffer = await fetch(font).then((res) => res.arrayBuffer())
      pdfDoc.registerFontkit(fontkit)
      const customFont = await pdfDoc.embedFont(fontArrayBuffer)

      const text = order_date

      const text2 = order_number

      const margin = 165
      const leftOffset = 60
      const rightOffset = 60

      const textWidth1 = customFont.widthOfTextAtSize(text, 10)
      const textWidth2 = customFont.widthOfTextAtSize(text2, 10)

      const x1 = leftOffset
      const y1 = firstPage.getHeight() - margin - 18
      const x2 = firstPage.getWidth() - rightOffset - textWidth2
      const y2 = firstPage.getHeight() - margin - 18

      firstPage.drawText(text, {
        x: x1,
        y: y1,
        size: 14,
        font: customFont,
        opacity: 1,
      })

      firstPage.drawText(text2, {
        x: x2,
        y: y2,
        size: 14,
        font: customFont,
        opacity: 1,
      })

      const modifiedPdfBytes = await pdfDoc.save()

      const pdfBlob = new Blob([modifiedPdfBytes], { name: 'test.pdf' })

      const new_file = new File([pdfBlob], 'order.pdf', {
        type: 'application/pdf',
      })

      return new_file
    } else {
      const response = await fetch(file)
        .then((res) => res.blob())
        .then((blob) => {
          return blobToBytes(blob)
        })

      const pdfDoc = await PDFDocument.load(response)

      const totalPages = pdfDoc.getPageCount()
      const lastPage = pdfDoc.getPage(totalPages - 1)

      const fontArrayBuffer = await fetch(font).then((res) => res.arrayBuffer())
      pdfDoc.registerFontkit(fontkit)
      const customFont = await pdfDoc.embedFont(fontArrayBuffer)

      const jpgUrl = sign

      const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer())

      const jpgImage = await pdfDoc.embedJpg(jpgImageBytes)

      const text = name

      const text2 = new Date().toLocaleString()
      const text3 = type

      if (count_turn === 0) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 610 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 620 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText('Подписано', {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 633 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 646 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      } else if (count_turn === 1) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 675 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 685 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text3, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 700 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 715 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      } else if (count_turn === 2) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 675 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 685 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text3, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 700 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 715 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      } else if (count_turn === 3) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 310 - 18,
          y: lastPage.getHeight() - 675 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 310 - 18,
          y: lastPage.getHeight() - 685 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text3, {
          x: lastPage.getWidth() - 310 - 18,
          y: lastPage.getHeight() - 700 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 310 - 18,
          y: lastPage.getHeight() - 715 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      } else if (count_turn === 4) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 210 - 18,
          y: lastPage.getHeight() - 675 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 210 - 18,
          y: lastPage.getHeight() - 685 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text3, {
          x: lastPage.getWidth() - 210 - 18,
          y: lastPage.getHeight() - 700 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 210 - 18,
          y: lastPage.getHeight() - 715 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      } else if (count_turn === 5) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 110 - 18,
          y: lastPage.getHeight() - 675 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 110 - 18,
          y: lastPage.getHeight() - 685 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text3, {
          x: lastPage.getWidth() - 110 - 18,
          y: lastPage.getHeight() - 700 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 110 - 18,
          y: lastPage.getHeight() - 715 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      } else if (count_turn === 6) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 745 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 755 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text3, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 770 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 510 - 18,
          y: lastPage.getHeight() - 785 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      } else if (count_turn === 7) {
        lastPage.drawImage(jpgImage, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 745 - 18,
          width: 89,
          height: 22,
        })

        lastPage.drawText(text, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 755 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text3, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 770 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
        lastPage.drawText(text2, {
          x: lastPage.getWidth() - 410 - 18,
          y: lastPage.getHeight() - 785 - 18, // 50 is the margin from the top
          size: 10,
          font: customFont,
          opacity: 1,
        })
      }

      const modifiedPdfBytes = await pdfDoc.save()

      const pdfBlob = new Blob([modifiedPdfBytes], { name: 'test.pdf' })

      const new_file = new File([pdfBlob], 'order.pdf', {
        type: 'application/pdf',
      })

      return new_file
    }
  } catch (error) {
    console.error(error)
    // обработка ошибки, например, вывод сообщения об ошибке на экран
  }
}
