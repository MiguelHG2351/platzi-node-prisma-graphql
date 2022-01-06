import { Avocado } from "./models/avocado.model"

const avos: Avocado[] = [
    {
      createdAt: new Date(),
      updatedAt: undefined,
      deletedAt: undefined,
      name: 'Pinkerton Avocado',
      id: 'fpr72m9k',
      sku: 'B4HZ42TM',
      price: 1.27,
      image: '/images/pinkerton.jpg',
      attributes: {
        description:
          "First grown on the Pinkerton Ranch in Saticoy, California, in the early 1970s, 'Pinkerton' is a seedling of 'Hass' x 'Rincon'. The large fruit has a small seed, and its green skin deepens in color as it ripens. The thick flesh has a smooth, creamy texture, pale green color, good flavor, and high oil content. It shows some cold tolerance, to −1 °C (30 °F) and bears consistently heavy crops. A hybrid Guatemalan type, it has excellent peeling characteristics",
        shape: 'Long pear',
        hardiness: '-1 °C',
        taste: 'Marvelous, is an avocado',
      },
    },
  ]

export function find(): Avocado[] {
    return avos
}

export function findOne(id: string): Avocado {
    return avos[0]
}


