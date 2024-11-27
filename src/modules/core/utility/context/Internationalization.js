// ** React Imports
import {useState, createContext, useEffect} from 'react'
/* ************************************************ */
import {IntlProvider} from 'react-intl'
import flatten from 'flat'
import _ from "lodash"
/* ************************************************ */
import {_changeAppLang, _setAppLang, _setGlobal} from '../Utils'
import {genLang} from '@src/assets/data/locales'
import {useRTL} from "../hooks/useRTL"

// ** Create Context
const Context = createContext()

const IntlProviderWrapper = ({children, additionalLangs}) => {

// ** Menu msg obj
  const menuMessages = {
    en: {...genLang.en, ...additionalLangs.en},
    tr: {...genLang.tr, ...additionalLangs.tr},
    ar: {...genLang.ar, ...additionalLangs.ar}
    // ...additionalLangs
  }
  // ** States
  const defaultLang = process.env.REACT_APP_DEFAULT_LANG ?? 'en'
  const localStorageLang = localStorage.getItem('APP_LANG')
  const lang = localStorageLang ? (!_.isEmpty(menuMessages[localStorageLang]) ? localStorageLang : defaultLang) : defaultLang
  localStorage.setItem('APP_LANG', lang)
  const [locale, setLocale] = useState(lang)
  const [messages, setMessages] = useState(flatten(menuMessages[lang]))
  _setGlobal('messages', messages)
  const [isRtl, setIsRtl] = useRTL()
  _setAppLang(lang)

  useEffect(() => {
    if (locale === 'ar') {
      setIsRtl(true)
    } else {
      setIsRtl(false)
    }
    return () => {
    }
  }, [])

  // ** Switches Language
  const switchLanguage = lang => {
    _changeAppLang(lang)
  }

  // ** Switches Language
  const plainText = key => {
    return _.get(menuMessages, `${locale}.${key}`) ?? key
  }

  return (
    <Context.Provider value={{locale, switchLanguage, plainText}}>
      <IntlProvider key={locale} locale={locale} messages={messages} defaultLocale={defaultLang}>
        {children}
      </IntlProvider>
    </Context.Provider>
  )
}

export {IntlProviderWrapper, Context as IntlContext}
