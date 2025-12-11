import persianHeritage from '../../public/persianHeritage.png';
import abstractImage from '../../public/abstractImage.png'
import persianImage from '../../public/persianImage.png'
import scandinavianImage from '../../public/scandinavianImage.png'
import emeraldImage from '../../public/emeraldImage.png'
import runnerImage from '../../public/runnerImage.png'


export const navItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Prayer Mats', href: '/prayer-mats' },
    { label: 'Inspiration', href: '/inspiration' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];


  export const products = [
    { id: '1', name: 'Persian Heritage', category: 'Oriental', price: 2850, image: persianHeritage, isNew: true },
    { id: '2', name: 'Abstract Dream', category: 'Contemporary', price: 1950, image: abstractImage },
    { id: '3', name: 'Royal Medallion', category: 'Traditional', price: 3200, image: persianImage, isNew: true },
    { id: '4', name: 'Nordic Minimal', category: 'Modern', price: 1450, image: scandinavianImage },
    { id: '5', name: 'Emerald Luxury', category: 'Contemporary', price: 2100, image: emeraldImage },
    { id: '6', name: 'Tribal Runner', category: 'Vintage', price: 1650, image: runnerImage },
    // { id: '7', name: 'Persian Heritage', category: 'Oriental', price: 2850, image: navyImage },
    // { id: '8', name: 'Abstract Dream', category: 'Contemporary', price: 1950, image: abstractImage },
  ];
  