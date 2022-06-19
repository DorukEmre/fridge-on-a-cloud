Item
    name: string
    description: string
    quantity: number
    date_added: date
    category: Category[1..*]

    url: string

Category
    name: string
    description: string

    url: string