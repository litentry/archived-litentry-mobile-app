import {graphql} from 'msw';

export const parachainDetailHandler = graphql.query('getParaChainById', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainParachain: {
        __typename: 'SubstrateChainParachain',
        id: '2004',
        name: 'Moonbeam',
        lease: {__typename: 'SubstrateChainLease', period: '7 - 13', blockTime: ['512 days', '30 mins', '18 s']},
        lifecycle: 'Parachain',
        lastIncludedBlock: '',
        lastBackedBlock: '10482897',
        homepage: 'https://moonbeam.network/networks/moonbeam/',
        validators: {__typename: 'SubstrateChainValidatorsGroup', groupIndex: null, validators: []},
        nonVoters: [
          {
            __typename: 'SubstrateChainAccount',
            address: '111B8CxcmnWbuDLyGvgUmRezDCK1brRZmvUuQ6SrFdMyc3S',
            display: '111B8CXCMNWBUDLYGVGUMREZDCK1BRRZMVUUQ6SRFDMYC3S',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '114SUbKCXjmb9czpWTtS3JANSmNRwVa4mmsMrWYpRG1kDH5',
            display: 'BINANCE_STAKE_9',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '11uMPbeaEDJhUxzU4ZfWW9VQEsryP9XqFcNRfPdYda6aFWJ',
            display: '11UMPBEAEDJHUXZU4ZFWW9VQESRYP9XQFCNRFPDYDA6AFWJ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1124RsfEgJEZvEq4HbtGFcpqoxnqSy79EjNZY9tzPct3AB6o',
            display: '1124RSFEGJEZVEQ4HBTGFCPQOXNQSY79EJNZY9TZPCT3AB6O',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13mK8AssyPekT5cFuYQ7ijKNXcjHPq8Gnx6TxF5eFCAwoLQ',
            display: '13MK8ASSYPEKT5CFUYQ7IJKNXCJHPQ8GNX6TXF5EFCAWOLQ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '144QovJpwiT9fbvGPC8K8kgMnFz53CCVNjUyt52KbNT2Zzd',
            display: '144QOVJPWIT9FBVGPC8K8KGMNFZ53CCVNJUYT52KBNT2ZZD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
            display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '17bR6rzVsVrzVJS1hM4dSJU43z2MUmz7ZDpPLh8y2fqVg7m',
            display: '17BR6RZVSVRZVJS1HM4DSJU43Z2MUMZ7ZDPPLH8Y2FQVG7M',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '19wuq97qWXRT9tvYdHjimMGbZmRG7vNtu3Rp6HNkg9mdefC',
            display: '19WUQ97QWXRT9TVYDHJIMMGBZMRG7VNTU3RP6HNKG9MDEFC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1A2ATy1FEu5yQ9ZzghPLsRckPQ7XLmq5MJQYcTvGnxGvCho',
            display: '1A2ATY1FEU5YQ9ZZGHPLSRCKPQ7XLMQ5MJQYCTVGNXGVCHO',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1CKUGhSt9nkJ7EcitGvrKN67937XssYvYfdd58KiLKC219S',
            display: '1CKUGHST9NKJ7ECITGVRKN67937XSSYVYFDD58KILKC219S',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1EWbJs2jdh34mhH8ovwQTNiLmQ87mMksJW3raRMxk6WXY29',
            display: '1EWBJS2JDH34MHH8OVWQTNILMQ87MMKSJW3RARMXK6WXY29',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1Ew5wAsMtvbRdd4RdxSheLpEkSRc718gtcfTv8EmgzEbknA',
            display: 'BINANCE_STAKE_7',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1F13pZ5nZZsK96UBS8Rjj97wYVtpZvE7SGADiwVrfbkrAWK',
            display: '1F13PZ5NZZSK96UBS8RJJ97WYVTPZVE7SGADIWVRFBKRAWK',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1F7Xgr5VM5RiYmkCxS1xWH6GbcBgSA5Jpq1H6XpXnxFJ5KH',
            display: '1F7XGR5VM5RIYMKCXS1XWH6GBCBGSA5JPQ1H6XPXNXFJ5KH',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1FKf1easv1C2maDXv4iTquKwRsS53J7SeRt8Bhx9Y7N2KeQ',
            display: '1FKF1EASV1C2MADXV4ITQUKWRSS53J7SERT8BHX9Y7N2KEQ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1HDgY7vpDjafR5NM8dbwm1b3Rrs4zATuSCHHbe7YgpKUKFw',
            display: '1HDGY7VPDJAFR5NM8DBWM1B3RRS4ZATUSCHHBE7YGPKUKFW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1KgwVbhKLW1xCGfuU4rsyFPSKA9eyyyKN3NnWbSvYBRUtQv',
            display: '1KGWVBHKLW1XCGFUU4RSYFPSKA9EYYYKN3NNWBSVYBRUTQV',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1KmtAWkiVGRdMB9mBV6JVAcRw7ce8tZKY3L5ZH7uTNK4yMx',
            display: '1KMTAWKIVGRDMB9MBV6JVACRW7CE8TZKY3L5ZH7UTNK4YMX',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1LMtHkfrADk7awSEFC45nyDKWxPu9cK796vtrf7Fu3NZQmB',
            display: '1LMTHKFRADK7AWSEFC45NYDKWXPU9CK796VTRF7FU3NZQMB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1LUckyocmz9YzeQZHVpBvYYRGXb3rnSm2tvfz79h3G3JDgP',
            display: '1LUCKYOCMZ9YZEQZHVPBVYYRGXB3RNSM2TVFZ79H3G3JDGP',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
            display: 'Polkadot.pro - Realgar',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1RG5T6zGY4XovW75mTgpH6Bx7Y6uwwMmPToMCJSdMwdm4EW',
            display: 'IOSG Ventures',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1RJP5i7zuyBLtgGTMCD9oF8zQMTQvfc4zpKNsVxfvTKdHmr',
            display: '1RJP5I7ZUYBLTGGTMCD9OF8ZQMTQVFC4ZPKNSVXFVTKDHMR',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1RqhgLqwPXLRkQ6s9txTJuzRypyqSZUM3vqERV1pWJ4jShw',
            display: '1RQHGLQWPXLRKQ6S9TXTJUZRYPYQSZUM3VQERV1PWJ4JSHW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1SDbYDGFq27LKta9PmLdAtZYqMmHVbw8uiyURc6vc3TMGeB',
            display: '1SDBYDGFQ27LKTA9PMLDATZYQMMHVBW8UIYURC6VC3TMGEB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1StVBqjDJKogQTsLioHC44iFch1cEAv2jcpsnvsy5buBtUE',
            display: '1STVBQJDJKOGQTSLIOHC44IFCH1CEAV2JCPSNVSY5BUBTUE',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1W7neFxPiA76dthShJu3ZfJFNzyBjo3SrbafYQhT3GheLbD',
            display: '1W7NEFXPIA76DTHSHJU3ZFJFNZYBJO3SRBAFYQHT3GHELBD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1Wo6qcrh7wxc1kQY5nfixFuCAFuzkgiwau64SmrPXBE7vVf',
            display: '1WO6QCRH7WXC1KQY5NFIXFUCAFUZKGIWAU64SMRPXBE7VVF',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1XQn94kWaMVJG16AWPKGmYFERfttsjZq4ompSTz2jxHK6uL',
            display: '1XQN94KWAMVJG16AWPKGMYFERFTTSJZQ4OMPSTZ2JXHK6UL',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1YguHoyxTecVDPRksktGPPTXDMLbCoDaGprv1zcQNNWyC3X',
            display: '1YGUHOYXTECVDPRKSKTGPPTXDMLBCODAGPRV1ZCQNNWYC3X',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1ZKHNRib33noQn1FpjFsPCHuVYUfci5TXy4Lif1FcUUwZe6',
            display: 'BINANCE_STAKE_11',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1ZhsUETRc5VQx4j6udFXUUTUHqrXVeos4Y4u5q1fPybgATT',
            display: '1ZHSUETRC5VQX4J6UDFXUUTUHQRXVEOS4Y4U5Q1FPYBGATT',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1ZjP48pnmVw7oYNdoFQQAgH31Wt2rKa2wK6hcXLRShXwZim',
            display: '1ZJP48PNMVW7OYNDOFQQAGH31WT2RKA2WK6HCXLRSHXWZIM',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1bAVKRsNUbq1Qmvj7Cemkncjo17WgyWAusCFZQdUfeHSTYj',
            display: '1BAVKRSNUBQ1QMVJ7CEMKNCJO17WGYWAUSCFZQDUFEHSTYJ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1bYfKv8QUnGm5nSSWpQDPneZkVjU7x3XFyD1bHBMHJJVzqx',
            display: '1BYFKV8QUNGM5NSSWPQDPNEZKVJU7X3XFYD1BHBMHJJVZQX',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1dGsgLgFez7gt5WjX2FYzNCJtaCjGG6W9dA42d9cHngDYGg',
            display: '1DGSGLGFEZ7GT5WJX2FYZNCJTACJGG6W9DA42D9CHNGDYGG',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1dquPs8HbmkE5Zw6i6PA4VtVstjtaFCzxugSX1h9ujoNWpZ',
            display: '1DQUPS8HBMKE5ZW6I6PA4VTVSTJTAFCZXUGSX1H9UJONWPZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1eLUhRLQiikdt4zUrYdY4LwdwYDsStmjrqzGzC46XmuTatG',
            display: '1ELUHRLQIIKDT4ZURYDY4LWDWYDSSTMJRQZGZC46XMUTATG',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1ewM9mjr6zLcoetnqJdKRT1LBmAjY8QMApSeydJrxfUr4pc',
            display: '1EWM9MJR6ZLCOETNQJDKRT1LBMAJY8QMAPSEYDJRXFUR4PC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1exKbDASoDgU93bVstMdFFWE3sHt8SenfzsKVy33yAdoBzv',
            display: '1EXKBDASODGU93BVSTMDFFWE3SHT8SENFZSKVY33YADOBZV',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1h2JtSy1YkzGyx2jPYt2Nk27AckAs74sSSHMcBFZneVzc8T',
            display: '1H2JTSY1YKZGYX2JPYT2NK27ACKAS74SSSHMCBFZNEVZC8T',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1jZqirgn6ECrqwYNGUT1No9QSBWTatCkCe2nRzxFw2ufbyN',
            display: '1JZQIRGN6ECRQWYNGUT1NO9QSBWTATCKCE2NRZXFW2UFBYN',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1jqkeJhuoRudNTVL5dV1qZf8RQtyzcf6ZT4yyvUQbKFktr8',
            display: '1JQKEJHUORUDNTVL5DV1QZF8RQTYZCF6ZT4YYVUQBKFKTR8',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1nTfEEWASm1x6D16FPLLjPFC42Fb7Q5zLovrxQpPQe6j86s',
            display: '1NTFEEWASM1X6D16FPLLJPFC42FB7Q5ZLOVRXQPPQE6J86S',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1qHrBudib7D7UjinEjS2m3crTXe5QmjVHDo8LnQK8pCK1jR',
            display: '1QHRBUDIB7D7UJINEJS2M3CRTXE5QMJVHDO8LNQK8PCK1JR',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1ufRSF5gx9Q8hrYoj7KwpzQzDNqLJdbKrFwC6okxa5gtBRd',
            display: '1UFRSF5GX9Q8HRYOJ7KWPZQZDNQLJDBKRFWC6OKXA5GTBRD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1v7QwYLMaABh7eyFKN9PHbKquAyPt6PtcYZZWvf12KV5pMk',
            display: 'binance_stake_1',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1wcx1MBUQkmHL1ed4jMjo7U7eNNVvZjV7iVYedP7FEKqay6',
            display: '1WCX1MBUQKMHL1ED4JMJO7U7ENNVVZJV7IVYEDP7FEKQAY6',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1yGJ3h7TQuJWLYSsUVPZbM8aR8UsQXCqMvrFx5Fn1ktiAmq',
            display: '1YGJ3H7TQUJWLYSSUVPZBM8AR8USQXCQMVRFX5FN1KTIAMQ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1yHLcBprc2EYVJ3fve8ccD9wZFUvbfyacpD1faKoo2gC826',
            display: '1YHLCBPRC2EYVJ3FVE8CCD9WZFUVBFYACPD1FAKOO2GC826',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcaaABVRXtyepKmwNR4g5iH2NtTNVBz1McZ81p91uAm8',
            display: '1ZUGCAAABVRXTYEPKMWNR4G5IH2NTTNVBZ1MCZ81P91UAM8',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcab6MjhEwA3DvbFBwgrUTpkjr6A7J8W6nUibY5MuQa3',
            display: '1ZUGCAB6MJHEWA3DVBFBWGRUTPKJR6A7J8W6NUIBY5MUQA3',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcabTuN7rs1bFYb33gRemtg67i4Mvp1twW85nQKiwhwQ',
            display: '1ZUGCABTUN7RS1BFYB33GREMTG67I4MVP1TWW85NQKIWHWQ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcacYFxX3HveFpJVUShjfb3KyaomfVqMTFoxYuUWCdD8',
            display: '1ZUGCACYFXX3HVEFPJVUSHJFB3KYAOMFVQMTFOXYUUWCDD8',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcacan4nrJ3HPBmiBgEn2XvRMbehqvmzSQXT3uLBDkh3',
            display: '1ZUGCACAN4NRJ3HPBMIBGEN2XVRMBEHQVMZSQXT3ULBDKH3',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcaebzKgKLebGSQvtxpmPGCZLFoEVu6AfqwD7W5ZKQZt',
            display: '1ZUGCAEBZKGKLEBGSQVTXPMPGCZLFOEVU6AFQWD7W5ZKQZT',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcag7cJVBtVRnFxv5Qftn7xKAnR6YJ9x4x3XLgGgmNnS',
            display: '1ZUGCAG7CJVBTVRNFXV5QFTN7XKANR6YJ9X4X3XLGGGMNNS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcagDxgkJtPQ4cMReSwXUbhQPGgtDEmFdHaaoHAhkKhU',
            display: '1ZUGCAGDXGKJTPQ4CMRESWXUBHQPGGTDEMFDHAAOHAHKKHU',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcaiwmKdWsfuubmCMBgKKMLSef2TEC3Gfvv5GxLGTKMN',
            display: '1ZUGCAIWMKDWSFUUBMCMBGKKMLSEF2TEC3GFVV5GXLGTKMN',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcaj4mBMu7EULN4rafT5UTfBjbvqaoypZyxWa3io6qJS',
            display: '1ZUGCAJ4MBMU7EULN4RAFT5UTFBJBVQAOYPZYXWA3IO6QJS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcakrhr3ZR7q7B8WKuaZY5BjZAU43m79xEyhNQwLTFjb',
            display: '1ZUGCAKRHR3ZR7Q7B8WKUAZY5BJZAU43M79XEYHNQWLTFJB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcapKRuHy2C1PceJxTvXWiq6FHEDm2xa5XSU7KYP3rJE',
            display: 'Zug Capital',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcavJYzi2KErZy9CMbLANhfrFwMESgPz9q29eUCR5gTW',
            display: '1ZUGCAVJYZI2KERZY9CMBLANHFRFWMESGPZ9Q29EUCR5GTW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1zugcawsx74AgoC4wz2dMEVFVDNo7rVuTRjZMnfNp9T49po',
            display: '1ZUGCAWSX74AGOC4WZ2DMEVFVDNO7RVUTRJZMNFNP9T49PO',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '121gZtuuG6sq3BZp1UKg8oRLRZvp89SAYSxXypwDJjaSRJR5',
            display: '121GZTUUG6SQ3BZP1UKG8ORLRZVP89SAYSXXYPWDJJASRJR5',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '123VugBRFMqUEFviSYrG3ewdZ46ZmqxjmRaGY6BvakfdPVaG',
            display: '123VUGBRFMQUEFVISYRG3EWDZ46ZMQXJMRAGY6BVAKFDPVAG',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '124RsxuvWs31iWyUMvDsnoRUgLQfntxeBXnwWJd8eC7EVe1L',
            display: '124RSXUVWS31IWYUMVDSNORUGLQFNTXEBXNWWJD8EC7EVE1L',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '124YFXA3XoRs9Epcx3aRUSk3EKYaznocqMWfrMKtGjx8TJ2W',
            display: '124YFXA3XORS9EPCX3ARUSK3EKYAZNOCQMWFRMKTGJX8TJ2W',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1264tb9azwmsVruJFTQ3PKb8yCPjniBVyUV8ppsmbXz8D2Bw',
            display: '1264TB9AZWMSVRUJFTQ3PKB8YCPJNIBVYUV8PPSMBXZ8D2BW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '126CY11joFMpakVSRra9LtNFYWuUzbtA9BcGPpaEvn7R8RkN',
            display: '126CY11JOFMPAKVSRRA9LTNFYWUUZBTA9BCGPPAEVN7R8RKN',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '126QitTKJ393GUKdTDYjwmSKixFDghmJZ6HBZfy3gVWVqFGs',
            display: '126QITTKJ393GUKDTDYJWMSKIXFDGHMJZ6HBZFY3GVWVQFGS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
            display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12713bbq45c66CN9AD7yusSXWE1kY91DcMpjVcB2rXqZKy2w',
            display: '🔒stateless_money🔒',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12771k5UXewvK7FXd1RpPHxvFiCG4GQCrxRmXWN5tAAwDQoi',
            display: 'BINANCE_STAKE_8',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '129o9rYvETVNXW3mLSioZYmb2DieN1uwPKHJUJVNUYiZovBd',
            display: '129O9RYVETVNXW3MLSIOZYMB2DIEN1UWPKHJUJVNUYIZOVBD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12BJ7EMWbr7fGVu2DspPtGbxCCdJUfAMVbJtCm6xPEf4WGiS',
            display: '12BJ7EMWBR7FGVU2DSPPTGBXCCDJUFAMVBJTCM6XPEF4WGIS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12Bf7to9rCEiN4bbBeZ1vGFjyr96c24o3VCV2ZYB3gAqrHJ4',
            display: '12BF7TO9RCEIN4BBBEZ1VGFJYR96C24O3VCV2ZYB3GAQRHJ4',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12BxCyEpjmi3fz582Vs99y5o4khR9oRMQXhM9LUcAj4mKaYo',
            display: '12BXCYEPJMI3FZ582VS99Y5O4KHR9ORMQXHM9LUCAJ4MKAYO',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12DsYUto9AcKA4kRz1yLcGh13CTLe7LbUjDkMS8ZY8rCK4rn',
            display: '12DSYUTO9ACKA4KRZ1YLCGH13CTLE7LBUJDKMS8ZY8RCK4RN',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12Dwdme7TjaBpd6KUuid9cc4CVr17zkPVmTa5tZ59CDd8trq',
            display: '12DWDME7TJABPD6KUUID9CC4CVR17ZKPVMTA5TZ59CDD8TRQ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12ECDEb18Wiy4MoLn3NTM5zhJfDfpS4mLNvjHpcEr8ogGrMZ',
            display: '12ECDEB18WIY4MOLN3NTM5ZHJFDFPS4MLNVJHPCER8OGGRMZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12EZemmyPLVnf7swvzfHA3ymn4eVRzgnTE6EpLvPpVSDfWd2',
            display: '12EZEMMYPLVNF7SWVZFHA3YMN4EVRZGNTE6EPLVPPVSDFWD2',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12F6vXGkoZoFNeVUNhr7MymX79EaSga8YsbZh5hufNhv9VQZ',
            display: '12F6VXGKOZOFNEVUNHR7MYMX79EASGA8YSBZH5HUFNHV9VQZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12GTt3pfM3SjTU6UL6dQ3SMgMSvdw94PnRoF6osU6hPvxbUZ',
            display: '12GTT3PFM3SJTU6UL6DQ3SMGMSVDW94PNROF6OSU6HPVXBUZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12HFymxpDmi4XXPHaEMp74CNpRhkqwG5qxnrgikkhon1XMrj',
            display: '12HFYMXPDMI4XXPHAEMP74CNPRHKQWG5QXNRGIKKHON1XMRJ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12HTVpN7smNqUwbM5ART7dpoEV1rcY8itrKKMCzGikrJJo6A',
            display: '12HTVPN7SMNQUWBM5ART7DPOEV1RCY8ITRKKMCZGIKRJJO6A',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12JZr1HgK8w6zsbBj6oAEVRkvisn8j3MrkXugqtvc4E8uwLo',
            display: '12JZR1HGK8W6ZSBBJ6OAEVRKVISN8J3MRKXUGQTVC4E8UWLO',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12KWfEe5ttGK6kfp2bVfh1arhqSdneJpqA5S8pAix8yao1YT',
            display: '12KWFEE5TTGK6KFP2BVFH1ARHQSDNEJPQA5S8PAIX8YAO1YT',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12MqEB7VLqKRgxCoGZXriPuo4GNYtaFiQ1tjMZhooPXAycM2',
            display: '12MQEB7VLQKRGXCOGZXRIPUO4GNYTAFIQ1TJMZHOOPXAYCM2',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12RVY2KvBCyBuKXNEpjqWVFaePhURwubBXqcyXKsEKdhhujG',
            display: '12RVY2KVBCYBUKXNEPJQWVFAEPHURWUBBXQCYXKSEKDHHUJG',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12TbSvTaKQ59RvSFj9XMFgtLD3c4CYoAR57pm2CqqszQiwGb',
            display: '12TBSVTAKQ59RVSFJ9XMFGTLD3C4CYOAR57PM2CQQSZQIWGB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12VYdJfVizmqvYG45qrA2YHjcjPehGJvwy2PRCZG1RnzPtAL',
            display: '12VYDJFVIZMQVYG45QRA2YHJCJPEHGJVWY2PRCZG1RNZPTAL',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12WmM98h4Ar6y7ZyyMKPXwSyuP5GSZvXTbEkDXm1tirbZFW4',
            display: '12WMM98H4AR6Y7ZYYMKPXWSYUP5GSZVXTBEKDXM1TIRBZFW4',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12YFVu7E6v1EYv5XMKRLPg3UrTJAUMw68WxGgFNenRGEiXVJ',
            display: 'We Trust',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12YriAKEHukpdbFLB6C8Fyxsjo4bEW1Fk2RvYxMm1kZKUiGK',
            display: '12YRIAKEHUKPDBFLB6C8FYXSJO4BEW1FK2RVYXMM1KZKUIGK',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12bUkY5nrGyoXqBpxKDf88z5VQWzaUK83PCgyHtJ1UN1ujjU',
            display: '12BUKY5NRGYOXQBPXKDF88Z5VQWZAUK83PCGYHTJ1UN1UJJU',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12doHFjPjPngNvZCWX4WeF4rkLFJ5LmmEyDvPGQ2C1aPppwy',
            display: '12DOHFJPJPNGNVZCWX4WEF4RKLFJ5LMMEYDVPGQ2C1APPPWY',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12eA9gosVR5Qa2hnibGZFNYSbxG3pafNeVGGi5eJQueautfX',
            display: '12EA9GOSVR5QA2HNIBGZFNYSBXG3PAFNEVGGI5EJQUEAUTFX',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12eZSMk8GJYE2Lq943dSEnMUoZs1ek7jU8QN3rEA1yPZPjcR',
            display: '12EZSMK8GJYE2LQ943DSENMUOZS1EK7JU8QN3REA1YPZPJCR',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12gkhA8JEz8ywmVj1tsVafSp9C4saKzSofgMwBJcmFJAGUVX',
            display: '12GKHA8JEZ8YWMVJ1TSVAFSP9C4SAKZSOFGMWBJCMFJAGUVX',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12iqwZGB2sguEhjFi2ZRuWWixU8mHJnSiP1pwDefqGsBy4rV',
            display: 'dakkk',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12jjUEmaKuwC1SxQHe8eXpcv6AzdWiXdvf55VvP1y8bf548b',
            display: '12JJUEMAKUWC1SXQHE8EXPCV6AZDWIXDVF55VVP1Y8BF548B',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12pgR5dyEkUP6iTR9u7b74Nz7uCsCYKpkFfA5LFbQPjGwNHL',
            display: '12PGR5DYEKUP6ITR9U7B74NZ7UCSCYKPKFFA5LFBQPJGWNHL',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12pv5MpfASPBPnUt81HcbeHniidqNmV12T1Yw45DNGoTuH3D',
            display: '12PV5MPFASPBPNUT81HCBEHNIIDQNMV12T1YW45DNGOTUH3D',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12sVtnWbnwZPQBnDnArQww3Bm9FNUSZraJJniTRyCrGCJ7aW',
            display: '12SVTNWBNWZPQBNDNARQWW3BM9FNUSZRAJJNITRYCRGCJ7AW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12ud6X3HTfWmV6rYZxiFo6f6QEDc1FF74k91vF76AmCDMT4j',
            display: '12UD6X3HTFWMV6RYZXIFO6F6QEDC1FF74K91VF76AMCDMT4J',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12woCF72ik4rYzm8gUagTkEBw4S1zE4rRnAk7SaiHbbV9tDy',
            display: '12WOCF72IK4RYZM8GUAGTKEBW4S1ZE4RRNAK7SAIHBBV9TDY',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12wtfs4UfodYT1Y6y8NQsQaduLSJbhz7oaNt1F6gTLFHD1y5',
            display: '12WTFS4UFODYT1Y6Y8NQSQADULSJBHZ7OANT1F6GTLFHD1Y5',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12xedMA9ZJFe6Ui5VDYML3PsCde2LbhUzEYEPyCgFRcJvfRB',
            display: '12XEDMA9ZJFE6UI5VDYML3PSCDE2LBHUZEYEPYCGFRCJVFRB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '12y1iXXa67DSkV3XLCVhg7PE9FkgGDbuMXDubCR4GWxRVV4v',
            display: '12Y1IXXA67DSKV3XLCVHG7PE9FKGGDBUMXDUBCR4GWXRVV4V',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '1342iFZNrBfCP9VWxqt5p39LiHp2ynyq85Ww9K7R8w6BURps',
            display: '1342IFZNRBFCP9VWXQT5P39LIHP2YNYQ85WW9K7R8W6BURPS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '134Bw4gHcAaHBYx6JVK91b1CeC9yWseVdZqyttpaN5zBHn43',
            display: '134BW4GHCAAHBYX6JVK91B1CEC9YWSEVDZQYTTPAN5ZBHN43',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '135hDL5idtbVNAgtMguJtT64wEukPFZkSEJAmhT6EiKfZzP5',
            display: '135HDL5IDTBVNAGTMGUJTT64WEUKPFZKSEJAMHT6EIKFZZP5',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '135wKSGZpQcTrhmFju9VeKC68gMBMsCYpSNtDyoqj3BVSZ1R',
            display: '135WKSGZPQCTRHMFJU9VEKC68GMBMSCYPSNTDYOQJ3BVSZ1R',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '138LYmCfDRrt3FxuT9hraYggVfyn6nVkwsn8VZpP3Pnt6xpa',
            display: '138LYMCFDRRT3FXUT9HRAYGGVFYN6NVKWSN8VZPP3PNT6XPA',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '138QdRbUTB9eNY94Q4Mj5r39FkgMiyHCAy8UFMNA5gvtrfSB',
            display: 'Figment',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '138jGBBQBwJGTmcxK7e8PT4KEAGdpXybMD3GepSJ3T76wuGc',
            display: '138JGBBQBWJGTMCXK7E8PT4KEAGDPXYBMD3GEPSJ3T76WUGC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '138shUfcSLvdTPr2DYJXxoBnTKe5LwufhKiJwmhi7TLVVMH1',
            display: '138SHUFCSLVDTPR2DYJXXOBNTKE5LWUFHKIJWMHI7TLVVMH1',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '139FVSnE8hkd1vVJmECkAsKeLyAJrS6kKq5TxTJbDEq1YvRc',
            display: '139FVSNE8HKD1VVJMECKASKELYAJRS6KKQ5TXTJBDEQ1YVRC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '139MMfwzrHyveFAuCS5SUaZG85qwM66pRnvoKyST3gd9Ao1F',
            display: '139MMFWZRHYVEFAUCS5SUAZG85QWM66PRNVOKYST3GD9AO1F',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13AtGSHJaDZrLHELmK6iKAuaAKHcetrH73N2KEb5M5SX1yDR',
            display: '13ATGSHJADZRLHELMK6IKAUAAKHCETRH73N2KEB5M5SX1YDR',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13BjZTpwEtPMcHrEbqxpgS8mz44cwv31UgyXoVM2uggSHKAT',
            display: '13BJZTPWETPMCHREBQXPGS8MZ44CWV31UGYXOVM2UGGSHKAT',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13EPZEnsPNqctZyC5myyU1YwL1ZbRyDzoN7pDazPm9mGzbiJ',
            display: '13EPZENSPNQCTZYC5MYYU1YWL1ZBRYDZON7PDAZPM9MGZBIJ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13EoWMYoRkUHGFiuPk73gN5drLfW3iu4XPqQV8SV74UL7Cyb',
            display: '13EOWMYORKUHGFIUPK73GN5DRLFW3IU4XPQQV8SV74UL7CYB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13HtFCrxyz55KgkPWcnhHPwE8f8GmZrfXR3uC6jNrihGzmqz',
            display: '13HTFCRXYZ55KGKPWCNHHPWE8F8GMZRFXR3UC6JNRIHGZMQZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13J6LkvsEtdZpvRwUMVNbag26md9ycmGe5PM8UnEokhL6Tgk',
            display: '13J6LKVSETDZPVRWUMVNBAG26MD9YCMGE5PM8UNEOKHL6TGK',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13JuYFD8KzXaYB5uxNvMGX7yzHyQC4n8KiSo7obeSHnncGxx',
            display: '13JUYFD8KZXAYB5UXNVMGX7YZHYQC4N8KISO7OBESHNNCGXX',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13KsApgfYuwVz27YwXCpLUHXPtKSv9WpwUEWrMRVTKCh7hsX',
            display: '13KSAPGFYUWVZ27YWXCPLUHXPTKSV9WPWUEWRMRVTKCH7HSX',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13KuUijCvWN3pwVcwjzVa2Nov8eZTKy7fJ69sMD7mZyQvjAF',
            display: '13KUUIJCVWN3PWVCWJZVA2NOV8EZTKY7FJ69SMD7MZYQVJAF',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13N2NpDg6kU1vAGuPv9MkTj4YsaDmf7BKyr3TTxhV5sFmuhd',
            display: '13N2NPDG6KU1VAGUPV9MKTJ4YSADMF7BKYR3TTXHV5SFMUHD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13NFKRvvSoKCAg3Q8HjigdBNvg5ypC8Rh6aziQjfUF2YspLV',
            display: '13NFKRVVSOKCAG3Q8HJIGDBNVG5YPC8RH6AZIQJFUF2YSPLV',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13NL7w9SitBziaa9nBhWmuzmEaRTuX1RvWYs21zKyrvBokgT',
            display: '13NL7W9SITBZIAA9NBHWMUZMEARTUX1RVWYS21ZKYRVBOKGT',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13Q48Ep3PVpvXA1BeVcUhNJerLshsaeq4EdgPUHnemqJYmND',
            display: '13Q48EP3PVPVXA1BEVCUHNJERLSHSAEQ4EDGPUHNEMQJYMND',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13Q5v2kmjLCfRbcV5TQNkshPERSBVsoodFgZQakdPJsZKaMc',
            display: '13Q5V2KMJLCFRBCV5TQNKSHPERSBVSOODFGZQAKDPJSZKAMC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13QsfwpQGVuyu4uh7JcfbuBACLMZ3cMr7pF4vE1imuBgXcKN',
            display: '13QSFWPQGVUYU4UH7JCFBUBACLMZ3CMR7PF4VE1IMUBGXCKN',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13RENAu9cpMpxp3EYzWFGpZXgvMZGDrnconYugNdynQz1sDQ',
            display: '13RENAU9CPMPXP3EYZWFGPZXGVMZGDRNCONYUGNDYNQZ1SDQ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13YDN239LTFZVFDuuyz8WTKHxMSCvEqiPQe1kyjABcRgxhNz',
            display: '13YDN239LTFZVFDUUYZ8WTKHXMSCVEQIPQE1KYJABCRGXHNZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13Ybj8CPEArUee78DxUAP9yX3ABmFNVQME1ZH4w8HVncHGzc',
            display: '13YBJ8CPEARUEE78DXUAP9YX3ABMFNVQME1ZH4W8HVNCHGZC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13bEAraR65YASSynHhGNrsEyPgWfcLLYdgYV6GmeB6bbUeeg',
            display: 'StakeDOTs.com - by Bison Trails',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13dCwieVYyuLVRdDcxomFeaYU1C73QpNDJreqHvKcggikWjK',
            display: '13DCWIEVYYULVRDDCXOMFEAYU1C73QPNDJREQHVKCGGIKWJK',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13dVcF8BjzUpYujj5HxumDLPwpHzMPwzPZAZHJQEbKRJuNgT',
            display: 'T-Systems MMS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13e8KMQZHJkGDrMT3W2vbNLGJ4ZNEudvVuZbXQybd4RkfuQW',
            display: '13E8KMQZHJKGDRMT3W2VBNLGJ4ZNEUDVVUZBXQYBD4RKFUQW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13idDU1EZyPTA1Y57tN9grzmLfQm4TEbvc98QErRbQuZyRVu',
            display: '13IDDU1EZYPTA1Y57TN9GRZMLFQM4TEBVC98QERRBQUZYRVU',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13ippe26nFP9yXRjMd7jMXcbB5ChKi686zzMy8q5BEu9JMUe',
            display: '13IPPE26NFP9YXRJMD7JMXCBB5CHKI686ZZMY8Q5BEU9JMUE',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13j3xpD9eEYDvuCKNaxiL1oZ1AbiswKXanKucPLG4D3JHP7d',
            display: '13J3XPD9EEYDVUCKNAXIL1OZ1ABISWKXANKUCPLG4D3JHP7D',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13mgD5oqo2XN3upmZLGJcenqq8Uzv55vYaWQmbFHMrhpjp5K',
            display: '13MGD5OQO2XN3UPMZLGJCENQQ8UZV55VYAWQMBFHMRHPJP5K',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13mhUnQ6qwvuuTYoKTtJkmssm3jDCGhTTSsHCXvvRhFooDiF',
            display: '13MHUNQ6QWVUUTYOKTTJKMSSM3JDCGHTTSSHCXVVRHFOODIF',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13mx7NQBYoo6TY9sRsCAEbZBnen9BBK16AfkxhPf4LcsaTf5',
            display: '13MX7NQBYOO6TY9SRSCAEBZBNEN9BBK16AFKXHPF4LCSATF5',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13ougYD2SRkn88L14XiYCJc3mL7AzWoAMVdn1FwLumV49LjU',
            display: 'BINANCE_STAKE_10',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13p1j6KdNjTpmxkGFXLBukb5uB4pv8Ga2sHhFX6ibDzmPma8',
            display: '13P1J6KDNJTPMXKGFXLBUKB5UB4PV8GA2SHHFX6IBDZMPMA8',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13p9kJiRnfy8QSjFoovHzatuE7SW5xdddxDvk9mXtERueo9E',
            display: '13P9KJIRNFY8QSJFOOVHZATUE7SW5XDDDXDVK9MXTERUEO9E',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13rvhBRU2Hmnk68AVn5igNnaBU91MG38SHMB9Bo3r8p8vsWa',
            display: '13RVHBRU2HMNK68AVN5IGNNABU91MG38SHMB9BO3R8P8VSWA',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13rw7bdvQDSHdWzFoP38a3khQBWnN4z93cw6rcUjjW4szYme',
            display: '13RW7BDVQDSHDWZFOP38A3KHQBWNN4Z93CW6RCUJJW4SZYME',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13sWHDukhwQQzwFmZLAhWkwhnzg3vxwsXPGd54YPtLTi1Ahc',
            display: '13SWHDUKHWQQZWFMZLAHWKWHNZG3VXWSXPGD54YPTLTI1AHC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13unmJm4yBZn12rFXQjV1pirJQbYc6EzzxrYBcSxYcN31NsF',
            display: '13UNMJM4YBZN12RFXQJV1PIRJQBYC6EZZXRYBCSXYCN31NSF',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13uvYLzWyhm3oSPT58nSTSGtxnsVRESTR9G8cUCZK7iVmeFe',
            display: '13UVYLZWYHM3OSPT58NSTSGTXNSVRESTR9G8CUCZK7IVMEFE',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13v1KUbnXcEPG32M7yMhY83rrtRMCZ9fsuTPXsk9AAqUwdVs',
            display: '13V1KUBNXCEPG32M7YMHY83RRTRMCZ9FSUTPXSK9AAQUWDVS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13wxjPuajyJrHcBabsgoD7oqL1mJhFVWjeXFxEvMbSBY9xn9',
            display: 'BINANCE_STAKE_4',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13x7PbKoj3YXPMkZEwweyozrsQjq3TXqNJa29cZvXtgzqpVY',
            display: '13X7PBKOJ3YXPMKZEWWEYOZRSQJQ3TXQNJA29CZVXTGZQPVY',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13xZTjKV6apcuZwgFUTtMfnVGkPK3BpS9dZYxLH5fHq5LpnG',
            display: '13XZTJKV6APCUZWGFUTTMFNVGKPK3BPS9DZYXLH5FHQ5LPNG',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13zTxDKSGvP8zHr4R1b2bCmJaMPg9a1X7U6LSnkeLEdWSvtB',
            display: '13ZTXDKSGVP8ZHR4R1B2BCMJAMPG9A1X7U6LSNKELEDWSVTB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '13zYzYw1tQY5dfN4mRrHuuCfXBtKZgcq3uRfpH2Z9YyznpSv',
            display: '13ZYZYW1TQY5DFN4MRRHUUCFXBTKZGCQ3URFPH2Z9YYZNPSV',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '142zbv9g5osTGpuF1WigBMJBffPmT1Lo2Lsh1JgWiv965Du6',
            display: '142ZBV9G5OSTGPUF1WIGBMJBFFPMT1LO2LSH1JGWIV965DU6',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '143CgByFQCU1cj6vRfoxrFMpo8aKYRMZd6VjpoB6aNh2pA4N',
            display: '143CGBYFQCU1CJ6VRFOXRFMPO8AKYRMZD6VJPOB6ANH2PA4N',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '145MSC4N7BsnnXjunBjD7t5oKn6T2AR3T8Zi9zcupXUJoumC',
            display: '145MSC4N7BSNNXJUNBJD7T5OKN6T2AR3T8ZI9ZCUPXUJOUMC',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '145MeLV4uyei8H4H7Amb89uQW7y9reMAJkBYyQTXk6PCHnoW',
            display: '145MELV4UYEI8H4H7AMB89UQW7Y9REMAJKBYYQTXK6PCHNOW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '148ADE3THVr8C6pkkmvmdNtuu3XVVBCHVSy2su7EXgZzRBpQ',
            display: '148ADE3THVR8C6PKKMVMDNTUU3XVVBCHVSY2SU7EXGZZRBPQ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '148CkH8YBzA1pbudK1bMo2zUMHZwbucBVH8s3utwTS687UiR',
            display: '148CKH8YBZA1PBUDK1BMO2ZUMHZWBUCBVH8S3UTWTS687UIR',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '148HzdSuFsDrNKnAHFs81BJzZxmKgwEC6Pmpw2QJnTy3Hv3R',
            display: 'CoinFund/Grassfed',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '148Ta5cWD3wekK3C6EbdDhYrdxC5e71VTKQCjmHUjE1DCG31',
            display: '148TA5CWD3WEKK3C6EBDDHYRDXC5E71VTKQCJMHUJE1DCG31',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14AbuiHSAJZLTacXnckSXq4CisK9X112ZT48x9uvJPxKXBmg',
            display: '14ABUIHSAJZLTACXNCKSXQ4CISK9X112ZT48X9UVJPXKXBMG',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14AkAFBzukRhAFh1wyko1ZoNWnUyq7bY1XbjeTeCHimCzPU1',
            display: '14AKAFBZUKRHAFH1WYKO1ZONWNUYQ7BY1XBJETECHIMCZPU1',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14Bc4vwBpfZbvphNzLu2ZUs7p9rLeYcssHG4EBKMKpxnXxhF',
            display: '14BC4VWBPFZBVPHNZLU2ZUS7P9RLEYCSSHG4EBKMKPXNXXHF',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14BeKcfcvJSJjvu9GZ2CA8EQ3XkK9J1HdwDrfz5Sg5ERDnrP',
            display: 'ETHICAL VALIDATORS 0',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14CRo92REj3aXfUeonVSti1VEHgxhWbtKY9hwxvD5T3BBXkK',
            display: '14CRO92REJ3AXFUEONVSTI1VEHGXHWBTKY9HWXVD5T3BBXKK',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14DCwC1uGJjRdVLgqNbVkoGU8rooUx9WG7fWzC1Nn6g5yc5T',
            display: '14DCWC1UGJJRDVLGQNBVKOGU8ROOUX9WG7FWZC1NN6G5YC5T',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14E5oijQt2PJo4MLtCVemjLVuAAu3hf1myeHVFsMoKNFcUpF',
            display: '14E5OIJQT2PJO4MLTCVEMJLVUAAU3HF1MYEHVFSMOKNFCUPF',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14Fqi7dFQfRtQRrtBW7BL5m9E1fbTp3dvAnW19AUqEKhWCFd',
            display: '14FQI7DFQFRTQRRTBW7BL5M9E1FBTP3DVANW19AUQEKHWCFD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14GWWeZzMYkR7bwyeBvq7c44nJr4ncEodM4fAJX89ZSAHLw3',
            display: 'BINANCE_STAKE_13',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14JUa7g5AVsrLbvcL1cpgNvbd8pctwTaCiV1dBk7nFcZmCqE',
            display: '14JUA7G5AVSRLBVCL1CPGNVBD8PCTWTACIV1DBK7NFCZMCQE',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14JrNRUQz7EMnjv8ZYFkP8b8LPyNnCQpwyHkJutGwov4fL33',
            display: '14JRNRUQZ7EMNJV8ZYFKP8B8LPYNNCQPWYHKJUTGWOV4FL33',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14MQcaQQSptK9iriyMYFWLQezFjFihyrTg4YoKGyeNm7P34M',
            display: '14MQCAQQSPTK9IRIYMYFWLQEZFJFIHYRTG4YOKGYENM7P34M',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14PnsLeTyovxc5SNR1n29izokA9ZLVjW7mDi71HribZDeppz',
            display: '14PNSLETYOVXC5SNR1N29IZOKA9ZLVJW7MDI71HRIBZDEPPZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14QBQABMSFBsT3pDTaEQdshq7ZLmhzKiae2weZH45pw5ErYu',
            display: 'P2P.ORG',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14VWEJDSWfHyuTSwErEXxFaiCW3i2gf2NPRkZ5igx6rnmqFd',
            display: '14VWEJDSWFHYUTSWEREXXFAICW3I2GF2NPRKZ5IGX6RNMQFD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14Y4s6V1PWrwBLvxW47gcYgZCGTYekmmzvFsK1kiqNH2d84t',
            display: 'RockX_Polkadot',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14Y626iStBUWcNtnmH97163BBJJ2f7jc1piGMZwEQfK3t8zw',
            display: '14Y626ISTBUWCNTNMH97163BBJJ2F7JC1PIGMZWEQFK3T8ZW',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14aQGaY6Py81SUUgeVnSDdd65YfsKH88GTsmHHejpr2xPjiB',
            display: '14AQGAY6PY81SUUGEVNSDDD65YFSKH88GTSMHHEJPR2XPJIB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14abtGtqVsnnKgSv4Cw6rm8DWn6aFej8Ko2tEjUXQbg7kURB',
            display: '14ABTGTQVSNNKGSV4CW6RM8DWN6AFEJ8KO2TEJUXQBG7KURB',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14bUYpiF2oxVpmXDnFxBipSi4m9zYBThMZoLpY8bRQrPQNG1',
            display: '14BUYPIF2OXVPMXDNFXBIPSI4M9ZYBTHMZOLPY8BRQRPQNG1',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14cxMDpBNLsNEXWyCzked3zghzaYWXwoqGT4h12GqQXdVhmn',
            display: '14CXMDPBNLSNEXWYCZKED3ZGHZAYWXWOQGT4H12GQQXDVHMN',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14g7XsFWsMpsPNkwQNhdHfsqKRehdRbpPLaGVTEhBe4Pt3Eu',
            display: '14G7XSFWSMPSPNKWQNHDHFSQKREHDRBPPLAGVTEHBE4PT3EU',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14gPzp8GA6u3vSiFR7JMyak5z7tjzwA4vL6dwBj8ZhACR8NX',
            display: '14GPZP8GA6U3VSIFR7JMYAK5Z7TJZWA4VL6DWBJ8ZHACR8NX',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14gYRjn6fn5hu45zEAtXodPDbtaditK8twoWUXFi6DsLwd31',
            display: '14GYRJN6FN5HU45ZEATXODPDBTADITK8TWOWUXFI6DSLWD31',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14ghKTz5mjZPgGYvgVC9VnFw1HYZmmsnYvSSHFgFTJfMvwQS',
            display: '14GHKTZ5MJZPGGYVGVC9VNFW1HYZMMSNYVSSHFGFTJFMVWQS',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14isBrPdSJDB6kGKoV8q5mFFYSg3rTD6w4QFypQtSWfmmqzD',
            display: '14ISBRPDSJDB6KGKOV8Q5MFFYSG3RTD6W4QFYPQTSWFMMQZD',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14j9Wz5XigrPrmdiprtpQ8q7vX2QiXfkR5F4EeauhsP6r367',
            display: '14J9WZ5XIGRPRMDIPRTPQ8Q7VX2QIXFKR5F4EEAUHSP6R367',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14jr3cxYb5QvoXaBFB2azXbWiNo4bzNiFEAokFbztrwP9LAz',
            display: '14JR3CXYB5QVOXABFB2AZXBWINO4BZNIFEAOKFBZTRWP9LAZ',
          },
          {
            __typename: 'SubstrateChainAccount',
            address: '14omEregtdXfuVsczJxukkPHPLEqoAG9gRxv5t4xUmSgtGfX',
            display: '14OMEREGTDXFUVSCZJXUKKPHPLEQOAG9GRXV5T4XUMSGTGFX',
          },
        ],
      },
    }),
  );
});
