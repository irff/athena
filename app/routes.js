// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  return [
    {
      path: '/',
      name: 'home',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/HomePage'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    }, {
      path: '/mahasiswa',
      name: 'mahasiswa',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Mahasiswa/reducer'),
          System.import('containers/Mahasiswa/sagas'),
          System.import('containers/Mahasiswa'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mahasiswa', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/mahasiswa/login',
          name: 'loginMahasiswa',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/UserAccess/reducer'),
              System.import('containers/UserAccess/sagas'),
              System.import('containers/UserAccess'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('userAccess', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/mahasiswa/signup',
          name: 'signupMahasiswa',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/UserAccess/reducer'),
              System.import('containers/UserAccess/sagas'),
              System.import('containers/UserAccess'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('userAccess', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/mahasiswa/cari-internship',
          name: 'cari-internship',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/CariInternship/reducer'),
              System.import('containers/CariInternship/sagas'),
              System.import('containers/CariInternship'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('cari-internship', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/mahasiswa/ubah-profil',
          name: 'ubah-profil',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/EditProfile/reducer'),
              System.import('containers/EditProfile/sagas'),
              System.import('containers/EditProfile'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('edit-profile', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '/perusahaan',
      name: 'perusahaan',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          System.import('containers/Mahasiswa/reducer'),
          System.import('containers/Mahasiswa/sagas'),
          System.import('containers/Mahasiswa'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([reducer, sagas, component]) => {
          injectReducer('mahasiswa', reducer.default);
          injectSagas(sagas.default);
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
      childRoutes: [
        {
          path: '/perusahaan/login',
          name: 'loginPerusahaan',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/UserAccess/reducer'),
              System.import('containers/UserAccess/sagas'),
              System.import('containers/UserAccess'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('userAccess', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
        {
          path: '/perusahaan/signup',
          name: 'signupPerusahaan',
          getComponent(nextState, cb) {
            const importModules = Promise.all([
              System.import('containers/UserAccess/reducer'),
              System.import('containers/UserAccess/sagas'),
              System.import('containers/UserAccess'),
            ]);

            const renderRoute = loadModule(cb);

            importModules.then(([reducer, sagas, component]) => {
              injectReducer('userAccess', reducer.default);
              injectSagas(sagas.default);
              renderRoute(component);
            });

            importModules.catch(errorLoading);
          },
        },
      ],
    }, {
      path: '*',
      name: 'notfound',
      getComponent(nextState, cb) {
        System.import('containers/NotFoundPage')
          .then(loadModule(cb))
          .catch(errorLoading);
      },
    },
  ];
}
