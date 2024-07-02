import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
// import Moment from 'moment'
import { RootState } from '../redux/rootReducer'
import { doLogout } from '../redux/auth/actions'
import { Frontend } from '../Utils/Constants'
import Step from '../components/Step'
import { resetGlobal } from '../redux/updater/actions'
import LocalDataService from '../services/LocalDataService'
import AccessConsume from '../wrappers/auth/AccessConsume'
import router from 'next/router'

const mapStateToProps = (store: RootState) => {
  const updaterReducer = store.updater
  return {
    updateNeeded: updaterReducer.updateNeeded,
  }
}

const mapDispatchToProps = {
  doLogout,
  resetGlobal,
}

export type UpdaterPropTypes = {
  doLogout: Function
  resetGlobal: Function
  updateNeeded: boolean
}

const Updater = ({ doLogout, resetGlobal, updateNeeded }: UpdaterPropTypes) => {
  const [currentStep, setCurrentStep] = useState(0)
  var today = new Date()

  useEffect(() => {
    if (!updateNeeded) {
      router.push('/home')
    }
  }, [])

  const delay = (delay: number) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, delay)
    })
  }

  const cleanRedux = async () => {
    setCurrentStep(5)
    setTimeout(() => {
      const appVersion = LocalDataService.getVersion()
      localStorage.setItem('appVersion', appVersion)
      localStorage.setItem('updated', today.toISOString())
      doLogout()
      resetGlobal()
    }, 1000)
  }

  const cleanDatabase = async () => {
    indexedDB.databases().then((dbs) => {
      let promises = dbs.map((db) => {
        return new Promise<void>((resolve, reject) => {
          if (!db.name) return
          const openRequest = indexedDB.open(db.name)

          openRequest.onsuccess = (event: any) => {
            const database = event.target.result

            const objectStoreNames = Array.from(database.objectStoreNames)
            let total = objectStoreNames.length
            objectStoreNames.forEach((storeName) => {
              const transaction = database.transaction(storeName, 'readwrite')
              const objectStore = transaction.objectStore(storeName)
              const clearRequest = objectStore.clear()

              clearRequest.onsuccess = () => {
                total--
                if (total == 0) resolve()
              }

              clearRequest.onerror = (error: any) => {
                reject(error)
              }
            })
          }

          openRequest.onerror = (error) => {
            reject(error)
          }
        })
      })
      Promise.all(promises)
        .then(async () => {
          setCurrentStep(4)
          setTimeout(() => {
            cleanRedux()
          }, 1000)
        })
        .catch(console.error)
    })
  }

  const clearServiceWorker = async () => {
    try {
      const timeExpected = 2500

      const timeStart = performance.now()

      const registrations = await navigator.serviceWorker.getRegistrations()

      for (let registration of registrations) {
        registration.unregister()
      }

      const timeEnd = performance.now()

      const timeLapsed = timeEnd - timeStart

      if (timeLapsed < timeExpected) {
        await delay(timeExpected - timeLapsed)
      }

      setCurrentStep(3)
      setTimeout(() => {
        cleanDatabase()
      }, 1000)

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const clearCache = async () => {
    try {
      const timeExpected = 2500

      const timeStart = performance.now()

      const storesCache = await caches.keys()

      const cachesToKeep: string | string[] = []

      Promise.all(
        storesCache.map(function (key) {
          if (cachesToKeep.indexOf(key) === -1) {
            return caches.delete(key)
          }
        })
      )

      const timeEnd = performance.now()

      const timeLapsed = timeEnd - timeStart

      if (timeLapsed < timeExpected) await delay(timeExpected - timeLapsed)

      setCurrentStep(2)
      clearServiceWorker()

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const clearLocalAndSessionStorage = async () => {
    try {
      const lastUpdated = localStorage.getItem('updated')

      window.localStorage.clear()
      window.sessionStorage.clear()
      window.localStorage.setItem('updated', lastUpdated ? lastUpdated : '')

      setCurrentStep(1)
      clearCache()

      return true
    } catch (error) {
      return false
    }
  }

  useEffect(() => {
    if (!location.search) {
      clearLocalAndSessionStorage()
    }
  }, [])

  return (
    <AccessConsume>
      <section className="updaterContainer">
        <div className="wizard">
          <Step
            title="Limpiando cookies"
            active={currentStep === 1}
            percentage={'20'}
            type="cookies"
          />

          <Step
            title="Limpiando Cache"
            active={currentStep === 2}
            percentage={'40'}
            type="cache"
          />

          <Step
            title="Limpiando Servicios"
            active={currentStep === 3}
            percentage={'60'}
            type="serviceWorker"
          />

          <Step
            title="Actualizando base de datos"
            active={currentStep === 4}
            percentage={'80'}
            type="dexieDB"
          />

          <Step
            title="Limpiando Informacion Innecesaria"
            active={currentStep === 5}
            percentage={'85'}
            type="redux"
          />
        </div>
      </section>
    </AccessConsume>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Updater)
