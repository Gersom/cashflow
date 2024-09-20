import IconGeometricFigures from '@icons/nav/IconGeometricFigures.vue';
import IconHome from '@icons/nav/IconHome.vue';
import IconPerson from '@icons/nav/IconPerson.vue';



let dataLinks = [
  {
    pageName: 'AppHome',
    text: 'Inicio',
    icon: IconHome,
  },
]

const devDataLinks = [
  {
    pageName: 'AppProfile',
    text: 'Perfil',
    icon: IconPerson,
  },
  {
    pageName: 'AppCategories',
    text: 'Categorías',
    icon: IconGeometricFigures,
  }
]

if (import.meta.env.VITE_ENV === 'development') {
  dataLinks = [...dataLinks, ...devDataLinks];
}

export default dataLinks