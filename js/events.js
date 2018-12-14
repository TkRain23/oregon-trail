eventTypes = [{
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'crew',
        value: -3,
        text: 'Attacked by Danzo. Casualties: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'crew',
        value: -4,
        text: 'Eight-Tails Jinchūriki Appeared. Casualties: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'food',
        value: -10,
        text: 'Rations stolen by bandits. Food lost: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'ryō',
        value: -50,
        text: 'Anbu raided base. Lost 両'
    },
    {
        type: 'STAT-CHANGE',
        notification: 'negative',
        stat: 'tailed_beast',
        value: -1,
        text: 'Tailed Beast(s) Escapes. Lost: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'food',
        value: 20,
        text: 'Found chakra fruit. Food added: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'food',
        value: 15,
        text: 'Found ramen shop. Food added: '
    },
    {
        type: 'STAT-CHANGE',
        notification: 'positive',
        stat: 'tailed_beast',
        value: 1,
        text: 'Captured Tailed Beast. New Tailed Beast: '
    },
    {
        type: 'SHOP',
        notification: 'neutral',
        text: 'You have found a shop',
        products: [{
                item: 'food',
                qty: 20,
                price: 50
            },
            {
                item: 'tailed beast',
                qty: 1,
                price: 200
            },
            {
                item: 'chakra',
                qty: 2,
                price: 50
            },
            {
                item: 'crew',
                qty: 5,
                price: 80
            }
        ]
    },
    {
        type: 'SHOP',
        notification: 'neutral',
        text: 'You have found a shop',
        products: [{
                item: 'food',
                qty: 30,
                price: 50
            },
            {
                item: 'tailed beast',
                qty: 1,
                price: 200
            },
            {
                item: 'chakra',
                qty: 2,
                price: 20
            },
            {
                item: 'crew',
                qty: 10,
                price: 80
            }
        ]
    },
    {
        type: 'SHOP',
        notification: 'neutral',
        text: 'Smugglers sell various goods',
        products: [{
                item: 'food',
                qty: 20,
                price: 60
            },
            {
                item: 'tailed ≈beast',
                qty: 1,
                price: 300
            },
            {
                item: 'chakra',
                qty: 2,
                price: 80
            },
            {
                item: 'crew',
                qty: 5,
                price: 60
            }
        ]
    },
    {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Chunin are attacking you'
    },
    {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Villagers are attacking you'
    },
    {
        type: 'ATTACK',
        notification: 'negative',
        text: 'Hokages are attacking you'
    }
];
