import { Image } from './Image';

export type Deck = {
  name: string,
  description: string,
  id: string,
  images: Image[],
  backside?: Image
}

export type DeckByID = {
  [key: string]: Deck
}

export const mockDecks: Deck[] = [
  {
    id: '0',
    name: 'example1',
    description: 'It is example deck description',
    images: [
      {id: 0, url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce7d2c19-50bd-4b62-8a7a-edbce0d143fa/d9wxh6c-37c09d73-ad60-4031-a831-0e680dde7837.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlN2QyYzE5LTUwYmQtNGI2Mi04YTdhLWVkYmNlMGQxNDNmYVwvZDl3eGg2Yy0zN2MwOWQ3My1hZDYwLTQwMzEtYTgzMS0wZTY4MGRkZTc4MzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gHEOIm4gJ3t_kxP7oelxtoMphZyjDGjzxWjzY2wqElQ'},
      {id: 1, url: 'https://lh3.googleusercontent.com/jfQQdJhBfUkmC0_ZKVVSk8Ij9S594V157oH5I1hfTk1062W-jP61KG6JNlIZV1zar8q2uGsmZG3q7M9HKe_g=s400'},
      {id: 2, url: 'https://vignette.wikia.nocookie.net/geometry-dash/images/6/6f/Cube057.png/revision/latest/scale-to-width-down/185?cb=20150829172414'}
    ]
  },
  {
    id: '1',
    name: 'example1',
    description: 'It is example deck description',
    images: [
      {id: 0, url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce7d2c19-50bd-4b62-8a7a-edbce0d143fa/d9wxh6c-37c09d73-ad60-4031-a831-0e680dde7837.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlN2QyYzE5LTUwYmQtNGI2Mi04YTdhLWVkYmNlMGQxNDNmYVwvZDl3eGg2Yy0zN2MwOWQ3My1hZDYwLTQwMzEtYTgzMS0wZTY4MGRkZTc4MzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gHEOIm4gJ3t_kxP7oelxtoMphZyjDGjzxWjzY2wqElQ'},
      {id: 1, url: 'https://lh3.googleusercontent.com/jfQQdJhBfUkmC0_ZKVVSk8Ij9S594V157oH5I1hfTk1062W-jP61KG6JNlIZV1zar8q2uGsmZG3q7M9HKe_g=s400'},
      {id: 2, url: 'https://vignette.wikia.nocookie.net/geometry-dash/images/6/6f/Cube057.png/revision/latest/scale-to-width-down/185?cb=20150829172414'}
    ]
  },
  {
    id: '2',
    name: 'example1',
    description: 'It is example deck description',
    images: [
      {id: 0, url: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ce7d2c19-50bd-4b62-8a7a-edbce0d143fa/d9wxh6c-37c09d73-ad60-4031-a831-0e680dde7837.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2NlN2QyYzE5LTUwYmQtNGI2Mi04YTdhLWVkYmNlMGQxNDNmYVwvZDl3eGg2Yy0zN2MwOWQ3My1hZDYwLTQwMzEtYTgzMS0wZTY4MGRkZTc4MzcucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.gHEOIm4gJ3t_kxP7oelxtoMphZyjDGjzxWjzY2wqElQ'},
      {id: 1, url: 'https://lh3.googleusercontent.com/jfQQdJhBfUkmC0_ZKVVSk8Ij9S594V157oH5I1hfTk1062W-jP61KG6JNlIZV1zar8q2uGsmZG3q7M9HKe_g=s400'},
      {id: 2, url: 'https://vignette.wikia.nocookie.net/geometry-dash/images/6/6f/Cube057.png/revision/latest/scale-to-width-down/185?cb=20150829172414'}
    ]
  }
]
