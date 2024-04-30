import Autocomplete from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { countries } from 'constants/countries'
// countries

// countries
export default function Country({ value, setStateCountry }) {
  const handleOnChange = () => {
    setStateCountry()
  }
  return (
    <Autocomplete
      id="country-select-demo"
      sx={{ width: '100%' }}
      options={countries}
      onChange={(event, newValue) => {
        setStateCountry(newValue.label)
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
          {...props}
        >
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code})
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Страна"
          inputProps={{
            ...params.inputProps,
          }}
          // Отключаем перемещение метки
          sx={{ background: 'white' }} // Устанавливаем фоновый цвет
        />
      )}
    />
  )
}
