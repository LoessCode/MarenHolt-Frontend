export const STUDIO = {
  name: 'Maren Holt',
  discipline: 'Architecture & Interiors',
  founded: 2009,
  email: 'studio@marenholt.com',
  offices: [
    { city: 'Lisbon', tz: 'Europe/Lisbon', address: ['Rua das Flores 61', '1200-194 Lisboa'] },
    { city: 'Copenhagen', tz: 'Europe/Copenhagen', address: ['Overgaden Neden Vandet 17', '1414 København K'] },
  ],
}

export const SLIDES = [
  {
    key: 'hero01',
    name: 'Casa Sul',
    place: 'Comporta, Portugal',
    year: '2024',
    type: 'Private residence',
    coords: '38°22′51″N 8°47′02″W',
  },
  {
    key: 'hero02',
    name: 'Fjordhus',
    place: 'Hardanger, Norway',
    year: '2023',
    type: 'Retreat',
    coords: '60°20′14″N 6°25′40″E',
  },
  {
    key: 'hero03',
    name: 'The Saltworks',
    place: 'Aveiro, Portugal',
    year: '2023',
    type: 'Hotel, 24 keys',
    coords: '40°38′29″N 8°39′13″W',
  },
  {
    key: 'hero04',
    name: 'House of Nine Walls',
    place: 'Mallorca, Spain',
    year: '2021',
    type: 'Private residence',
    coords: '39°41′07″N 3°01′55″E',
  },
]

export const METRICS = [
  { value: 17, unit: '', label: 'Years in practice', note: 'Founded in Lisbon, 2009' },
  { value: 142, unit: '', label: 'Projects completed', note: 'Houses, hotels, cultural spaces' },
  { value: 386, unit: 'k m²', label: 'Floor area designed', note: 'Across built and in-progress work' },
  { value: 23, unit: '', label: 'International awards', note: 'Incl. two Mies van der Rohe nominations' },
  { value: 11, unit: '', label: 'Countries built in', note: 'From the Algarve to Hokkaido' },
  { value: 94, unit: '%', label: 'Clients who return', note: 'For a second or third commission' },
]

// Share of completed projects by typology (sums to 100).
// Colours validated with the dataviz palette checker against the plaster surface.
export const TYPOLOGY = [
  { label: 'Residential', value: 54, color: '#C4582C' },
  { label: 'Hospitality', value: 22, color: '#2F64A0' },
  { label: 'Cultural', value: 14, color: '#C99212' },
  { label: 'Workplace', value: 10, color: '#2A9070' },
]

export const WORKS = [
  { key: 'work01', title: 'Casa Sul', place: 'Comporta, PT', type: 'Residence', year: '2024' },
  { key: 'work02', title: 'Fjordhus', place: 'Hardanger, NO', type: 'Retreat', year: '2023' },
  { key: 'work03', title: 'The Saltworks', place: 'Aveiro, PT', type: 'Hospitality', year: '2023' },
  { key: 'work04', title: 'Atelier Kanso', place: 'Kyoto, JP', type: 'Interiors', year: '2022' },
  { key: 'work05', title: 'House of Nine Walls', place: 'Mallorca, ES', type: 'Residence', year: '2021' },
  { key: 'work06', title: 'The Reading Room', place: 'Copenhagen, DK', type: 'Cultural', year: '2020' },
]
