import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  actosnId: [],
  commissions: [],
  actosn: [
    {
      act_num: '',
      date_act: '',
      uchrejdenie: '',
      struct_podrazdelenie: '',
      name_sredstva: '',
      mat_otv: '',
      zavod_num: '',
      invent_num: '',
      name_pokaz: '',
      debet: '',
      credit: '',
      summa: '',
      komis: '',
      rasporyaditel: '',
      date_naznach: '',
      naznach_num: '',
      osnovanie: '',
      name_obj: '',
      date_izgotov: '',
      date_postupleniya: '',
      date_expl: '',
      remont_count: '',
      summa_remontov: '',
      name_metall_1: '',
      kod_ucheta_1: '',
      ed_izm_1: '',
      code_okei_1: '',
      massa_1: '',
      name_metall_2: '',
      kod_ucheta_2: '',
      ed_izm_2: '',
      code_okei_2: '',
      massa_2: '',
      name_metall_3: '',
      kod_ucheta_3: '',
      ed_izm_3: '',
      code_okei_3: '',
      massa_3: '',
      zakluchenie: '',
      applications_id: '',
    },
  ],
  actmoc: [
    {
      date_utver: '',
      act_num: '',
      date_act: '',
      uchrejdenie: '',
      struct_podrazdelenie: '',
      mat_otv: '',
      komis: '',
      date_naznach: '',
      naznach_num: '',
      mesto: '',
      date_expl: '',
      kod_ucheta: '',
      summa: '',
      cena: '',
      zakluchenie: '',
      date_hraneniya: '',
      summa_propis: '',
      name_pokaz: '',
      debet: '',
      credit: '',
      rasporyaditel: '',
      osnovanie: '',
      name_obj: '',
      date_izgotov: '',
      date_postupleniya: '',
      remont_count: '',
      summa_remontov: '',
      ed_izm: '',
      code_okei: '',
      spisanie: [
        {
          id: '',
          name_spisanie: '',
          counts: '',
          prichina: '',
          let_expl: '',
          kod_ucheta: '',
          cena: '',
          summa: '',
          ed_izm: '',
          act_osn: '',
          act_moc: '',
        },
      ],
    },
  ],
}

const ActSlice = createSlice({
  name: 'act',
  initialState,
  reducers: {
    postBasicAct(state, action) {
      state.date_act = action.payload.date_act
      state.uchrejdenie = action.payload.uchrejdenie
      state.struct_podrazdelenie = action.payload.struct_podrazdelenie
      state.name_sredstva = action.payload.name_sredstva
      state.mat_otv = action.payload.mat_otv
      state.zavod_num = action.payload.zavod_num
      state.invent_num = action.payload.invent_num
      state.name_pokaz = action.payload.name_pokaz
      state.debet = action.payload.debet
      state.credit = action.payload.credit
      state.summa = action.payload.summa
      state.komis = action.payload.komis
      state.rasporyaditel = action.payload.rasporyaditel
      state.date_naznach = action.payload.date_naznach
      state.naznach_num = action.payload.naznach_num
      state.osnovanie = action.payload.osnovanie
      state.name_obj = action.payload.name_obj
      state.date_izgotov = action.payload.date_izgotov
      state.date_postupleniya = action.payload.date_postupleniya
      state.date_expl = action.payload.date_expl
      state.remont_count = action.payload.remont_count
      state.summa_remontov = action.payload.summa_remontov
      state.name_metall_1 = action.payload.name_metall_1
      state.kod_ucheta_1 = action.payload.kod_ucheta_1
      state.ed_izm_1 = action.payload.ed_izm_1
      state.code_okei_1 = action.payload.code_okei_1
      state.massa_1 = action.payload.massa_1
      state.name_metall_2 = action.payload.name_metall_2
      state.kod_ucheta_2 = action.payload.kod_ucheta_2
      state.ed_izm_2 = action.payload.ed_izm_2
      state.code_okei_2 = action.payload.code_okei_2
      state.massa_2 = action.payload.massa_2
      state.name_metall_3 = action.payload.name_metall_3
      state.kod_ucheta_3 = action.payload.kod_ucheta_3
      state.ed_izm_3 = action.payload.ed_izm_3
      state.code_okei_3 = action.payload.code_okei_3
      state.massa_3 = action.payload.massa_3
      state.zakluchenie = action.payload.zakluchenie
      state.applications_id = action.payload.applications_id
    },
    postLowAct(state, action) {
      state.date_utver = action.payload.date_utver
      state.act_num = action.payload.act_num
      state.date_act = action.payload.date_act
      state.uchrejdenie = action.payload.uchrejdenie
      state.struct_podrazdelenie = action.payload.struct_podrazdelenie
      state.mat_otv = action.payload.mat_otv
      state.komis = action.payload.komis
      state.date_naznach = action.payload.date_naznach
      state.naznach_num = action.payload.naznach_num
      state.mesto = action.payload.mesto
      state.date_expl = action.payload.date_expl
      state.kod_ucheta = action.payload.kod_ucheta
      state.summa = action.payload.summa
      state.cena = action.payload.cena
      state.zakluchenie = action.payload.zakluchenie
      state.date_hraneniya = action.payload.date_hraneniya
      state.summa_propis = action.payload.summa_propis
      state.name_pokaz = action.payload.name_pokaz
      state.debet = action.payload.debet
      state.credit = action.payload.credit
      state.rasporyaditel = action.payload.rasporyaditel
      state.osnovanie = action.payload.osnovanie
      state.name_obj = action.payload.name_obj
      state.date_izgotov = action.payload.date_izgotov
      state.date_postupleniya = action.payload.date_postupleniya
      state.remont_count = action.payload.remont_count
      state.summa_remontov = action.payload.summa_remontov
      state.code_okei = action.payload.code_okei
      state.spisanie = action.payload.spisanie
      state.applications_id = action.payload.applications_id
    },
    setActOsnById: (state, action) => {
      state.actosnId = action.payload.actosnId
    },
    setActMocById: (state, action) => {
      state.actosnId = action.payload.actosnId
    },
    setActCommissions: (state, action) => {
      state.commissions = action.payload.commissions
    },
    setPatchActOsn: (state, action) => {
      state.actosnId = action.payload
      state.actosnId.applications.status = action.payload.status
    },
    setPatchActMoc: (state, action) => {
      state.actosnId = action.payload
      state.actosnId.applications.status = action.payload.status
    },
  },
})

export const {
  postBasicAct,
  setActOsnById,
  setActMocById,
  postLowAct,
  setActCommissions,
  setPatchActOsn,
  setPatchActMoc,
} = ActSlice.actions

export default ActSlice.reducer
