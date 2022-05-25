import {graphql} from 'msw';

export const councilHandler = graphql.query('getCouncil', (_, res, ctx) => {
  return res(
    ctx.data({
      substrateChainCouncil: {
        members: [
          {
            account: {
              address: '1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL',
              display: 'RTTI-5220 (POLKADOT)',
            },
            backing: '218471073160628053',
            formattedBacking: '21.8471  MDOT',
            voters: [
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '12rgiL4r56kPE4PuYmz8snR21isfbrcp5Vbf8VdJe2AWDuus',
                display: 'il4r141',
              },
              {
                address: '14fhQS5myHCh3AQZZoELKpQuy2AfNe5am3PzTDvKi7i172n5',
                display: 'Vegas_life',
              },
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '16HvKyV9B61hsop3ZY6pWYeV537S29kd9pb9FMrPzx49ym5X',
                display: 'TheGuild',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '1495Q4EVrZy1NvY83uQXDKujU8r8wUNsmpnpFoL4MsjH8eLE',
                display: '1495Q4EVRZY1NVY83UQXDKUJU8R8WUNSMPNPFOL4MSJH8ELE',
              },
              {
                address: '12BkPLskXyXrHhktrinLxVFkPzzvCzCyVCaqHkUEoxMwSzeq',
                display: 'PromoTeam Validator',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '12ZNJzjPBZUh8VV5cuJFkbbwMttFNkH39EhoeYcgGHsJd4MG',
                display: '12ZNJZJPBZUH8VV5CUJFKBBWMTTFNKH39EHOEYCGGHSJD4MG',
              },
              {
                address: '14xQXJdUDC1pzyt8y3z27ANiUBgP7zTSaYutaLELJoyQrdLP',
                display: 'integritee',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14hM4oLJCK6wtS7gNfwTDhthRjy5QJ1t3NAcoPjEepo9AH67',
                display: '14HM4OLJCK6WTS7GNFWTDHTHRJY5QJ1T3NACOPJEEPO9AH67',
              },
              {
                address: '15DtxgAQ1XK5ywkx686AdFgLGkFDinoYLx2DyiZBuzUtZZnf',
                display: '15DTXGAQ1XK5YWKX686ADFGLGKFDINOYLX2DYIZBUZUTZZNF',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '16Jh21ThTh2tW98NuN2gM7Q3KaYiuJLbxCNbuBkFpwcDkRqx',
                display: 'Cypher Labs',
              },
              {
                address: '15kkg1mK1tCGgqqo3c1CghtKCQsBEAPPjYNNmmRT3r29FeRX',
                display: 'ANAMIX',
              },
              {
                address: '13zBFyK97dg4hWjXwEpigeVdu69sHa4fc8JYegpB369PAafq',
                display: '13ZBFYK97DG4HWJXWEPIGEVDU69SHA4FC8JYEGPB369PAAFQ',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8',
                display: '1JA1EH3J8RMB4DR9BRPREXEUASU22DEBFCAKGHO6VAQJDD8',
              },
              {
                address: '1LUckyocmz9YzeQZHVpBvYYRGXb3rnSm2tvfz79h3G3JDgP',
                display: '1LUCKYOCMZ9YZEQZHVPBVYYRGXB3RNSM2TVFZ79H3G3JDGP',
              },
              {
                address: '12dGS1zjyiUqj7GuxDDwv9i72RMye1mT7tSWNaSx7QVeJ32H',
                display: '12DGS1ZJYIUQJ7GUXDDWV9I72RMYE1MT7TSWNASX7QVEJ32H',
              },
              {
                address: '15CosmEmAfQAhnxwan18e5TueAe6bDzrqqxg13dToDWr7A8M',
                display: 'COSMOON',
              },
              {
                address: '14etN8LW2YB2WA7yBYDecyLFPpxMSaeV1nhxYbJi8uMJcfkD',
                display: '14ETN8LW2YB2WA7YBYDECYLFPPXMSAEV1NHXYBJI8UMJCFKD',
              },
              {
                address: '13pZskDR7Pt67NtcChSr4uFRBf9ZS52nQeyrceSykq8MDrMe',
                display: '13PZSKDR7PT67NTCCHSR4UFRBF9ZS52NQEYRCESYKQ8MDRME',
              },
              {
                address: '13ozGG4C5CnB2aQyrdxsf1yf5n4u6252J2Gd9neWk6Zz3psW',
                display: 'ForklessNation',
              },
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2',
                display: '12GPFMRQNSDHC9C5DUXYXBFA23IO5FSGTKTSAIMQTAWGUED2',
              },
              {
                address: '15iwUC3GMEFw5QsALmanQbKUVZKFzqQNUsemw8u8RHSFF7Jh',
                display: '15IWUC3GMEFW5QSALMANQBKUVZKFZQQNUSEMW8U8RHSFF7JH',
              },
              {
                address: '16iiKwFsRKRsjAiEpD4zgNgEX84nzHtHHNFKXhz1sHtan3ne',
                display: 'CryptoLab 01',
              },
              {
                address: '13YDWFhtW9AGVcVAqymwgLsCG7uLyFCpiT5jRqRoUG54sSLE',
                display: '13YDWFHTW9AGVCVAQYMWGLSCG7ULYFCPIT5JRQROUG54SSLE',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '16g43B7VPfTmpXQujSz3aKbqY9twSrDreHFWtwp4P7bLkQPp',
                display: 'Staking4All 🥩',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '16YGKSNQ2p2SXC2LuGsoBHrm8nKJgnkW9wpvJE6ahBvs6wpe',
                display: '16YGKSNQ2P2SXC2LUGSOBHRM8NKJGNKW9WPVJE6AHBVS6WPE',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '16JCybAA88yQ9t8Cus4YhB5mT5DjyBxBLEgYPCpH8HjnePTq',
                display: '16JCYBAA88YQ9T8CUS4YHB5MT5DJYBXBLEGYPCPH8HJNEPTQ',
              },
              {
                address: '14BP6oSYP62om8VKh7mScEcZqb472EzanSFJK2E3bwdWGtah',
                display: '14BP6OSYP62OM8VKH7MSCECZQB472EZANSFJK2E3BWDWGTAH',
              },
              {
                address: '155woeQGxnm2hPnA6LtCYk8Zr2L7FTnWAkfbLi986JU1AADo',
                display: '155WOEQGXNM2HPNA6LTCYK8ZR2L7FTNWAKFBLI986JU1AADO',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '15D1vSQnypvsuN4wcAGufmnmyKKc449P7R8vExj4jLvH4ype',
                display: '15D1VSQNYPVSUN4WCAGUFMNMYKKC449P7R8VEXJ4JLVH4YPE',
              },
              {
                address: '1dGsgLgFez7gt5WjX2FYzNCJtaCjGG6W9dA42d9cHngDYGg',
                display: '1DGSGLGFEZ7GT5WJX2FYZNCJTACJGG6W9DA42D9CHNGDYGG',
              },
              {
                address: '12nMGNKauUUg6wmu3kJn3xV9BBCBJiQzoQ7ddEcFPA25h6g1',
                display: '12NMGNKAUUUG6WMU3KJN3XV9BBCBJIQZOQ7DDECFPA25H6G1',
              },
              {
                address: '14ShUZUYUR35RBZW6uVVt1zXDxmSQddkeDdXf1JkMA6P721N',
                display: 'Wei',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '149riLdwAVzXg7Cm88RcXhbuFi3zUgwrGsJSSPjC47PRxHQW',
                display: '149RILDWAVZXG7CM88RCXHBUFI3ZUGWRGSJSSPJC47PRXHQW',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '12Dw4SzhsxX3fpDiLUYXm9oGbfxcbg1Peq67gc5jkkEo1TKr',
                display: '12DW4SZHSXX3FPDILUYXM9OGBFXCBG1PEQ67GC5JKKEO1TKR',
              },
              {
                address: '16GDRhRYxk42paoK6TfHAqWej8PdDDUwdDazjv4bAn4KGNeb',
                display: 'CP287-CLOUDWALK',
              },
              {
                address: '1tZzPmcq8Auisttygmg9g6tPMtrh9i3b22D3tKXvde7ibRB',
                display: '1TZZPMCQ8AUISTTYGMG9G6TPMTRH9I3B22D3TKXVDE7IBRB',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '13iacJEHdiTXfxrJ1UPiPAUAv4iXFYdbHbqEDmmdTNhz3h1L',
                display: 'LLoyds.tech',
              },
              {
                address: '13KPtnYPFZhrjZMbe1WLw9X1poA3r5xwM7XmRf8bVgdYhmRE',
                display: '13KPTNYPFZHRJZMBE1WLW9X1POA3R5XWM7XMRF8BVGDYHMRE',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
              {
                address: '12YqzycfMFoj6H5BYGrq8zBSCEUunVSitqPUuK1xLjpRMzpc',
                display: '12YQZYCFMFOJ6H5BYGRQ8ZBSCEUUNVSITQPUUK1XLJPRMZPC',
              },
              {
                address: '153Fz22gxQP8HM8RbnvEt9XWsXu9nR8jxZC2MbQFmuKhN62f',
                display: '153FZ22GXQP8HM8RBNVET9XWSXU9NR8JXZC2MBQFMUKHN62F',
              },
              {
                address: '16YwUZyLdeAoe4KmhivGwuuJpBH1US4qkUtXK2V83MVXUy6x',
                display: 'GTSTAKING',
              },
              {
                address: '1627VVB5gtHiseCV8ZdffF7P3bWrLMkU92Q6u3LsG8tGuB63',
                display: 'hirish',
              },
              {
                address: '13kz33kotYa3M75u5avMS367zJY3Fx2y5ZYASEPunqfEeCjD',
                display: 'WOJDOT   ʕ •ᴥ•ʔ',
              },
              {
                address: '154UtMXnexHfUTSvtUZpAfhGi1BejCrRH7YnnGF5faUtaVB5',
                display: '154UTMXNEXHFUTSVTUZPAFHGI1BEJCRRH7YNNGF5FAUTAVB5',
              },
              {
                address: '16SDUqoRr6f8DAyKhYWvo9dwFPdJHeFXFr1may1vhomqqPTQ',
                display: 'hsinchu',
              },
              {
                address: '12pMRYu1yWmdKDQLo9mWcjJYRPwfcnWBWLYh8tKpuJsCi2yF',
                display: '12PMRYU1YWMDKDQLO9MWCJJYRPWFCNWBWLYH8TKPUJSCI2YF',
              },
              {
                address: '15cfSaBcTxNr8rV59cbhdMNCRagFr3GE6B3zZRsCp4QHHKPu',
                display: '✨👍✨ Day7 ✨👍✨',
              },
              {
                address: '14AakQ4jAmr2ytcrhfmaiHMpj5F9cR6wK1jRrdfC3N1oTbUz',
                display: '14AAKQ4JAMR2YTCRHFMAIHMPJ5F9CR6WK1JRRDFC3N1OTBUZ',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '1y6CPLgccsysCEii3M7jQF834GZsz9A3HMcZz3w7RjGPpBL',
                display: '1Y6CPLGCCSYSCEII3M7JQF834GZSZ9A3HMCZZ3W7RJGPPBL',
              },
              {
                address: '15wznkm7fMaJLFaw7B8KrJWkNcWsDziyTKVjrpPhRLMyXsr5',
                display: '🌐 decentraDOT.com 🌐',
              },
              {
                address: '124RsxuvWs31iWyUMvDsnoRUgLQfntxeBXnwWJd8eC7EVe1L',
                display: '124RSXUVWS31IWYUMVDSNORUGLQFNTXEBXNWWJD8EC7EVE1L',
              },
              {
                address: '1dvvq2sZg55LfLqFmegU493oUaPWxJfjiYysP1eyovkX6hP',
                display: 'Afr',
              },
              {
                address: '15tfUt4iQNjMyhZiJGBf4EpETE2KqtW1nfJwbBT1MvWjvcK9',
                display: 'Tesla',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '1MrurrNb4VTrRJUXT6fGxHFdmwwscqHZUFkMistMsP8k5Nk',
                display: '🛡 DWELLIR DOT 🛡',
              },
              {
                address: '13ujCsf3t2YAdAhcpcEFVoJAPRYzMLHUHEnLroQp41sJCSnm',
                display: 'AG',
              },
              {
                address: '15Fg1fumsy7B7MHYhDkoD4Dw1jJ4qGkSm9cvusNTfdqaesFQ',
                display: '15FG1FUMSY7B7MHYHDKOD4DW1JJ4QGKSM9CVUSNTFDQAESFQ',
              },
              {
                address: '16A4n4UQqgxw5ndeehPjUAobDNmuX2bBoPXVKj4xTe16ktRN',
                display: '16A4N4UQQGXW5NDEEHPJUAOBDNMUX2BBOPXVKJ4XTE16KTRN',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '14AngS6QiZvC4AxvWFw7wXwzmctRGL7aWWriococE6rmhKqb',
                display: '14ANGS6QIZVC4AXVWFW7WXWZMCTRGL7AWWRIOCOCE6RMHKQB',
              },
            ],
          },
          {
            account: {
              address: '12m16pNVG4QKDsr3d9hA1TMjNhSxdQaztqZ5jMC86HLba1Qw',
              display: 'lucasvo',
            },
            backing: '172364093085193437',
            formattedBacking: '17.2364  MDOT',
            voters: [
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14K6CfR5NsTg1SZQVKpCVvwXS1bz1Bx1DpG98fYCcqo4gpaQ',
                display: '14K6CFR5NSTG1SZQVKPCVVWXS1BZ1BX1DPG98FYCCQO4GPAQ',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '14BRaQT6JV6tCPPH1shiNJ4PF1e1sRet8errHcjNyYeH36wK',
                display: '14BRAQT6JV6TCPPH1SHINJ4PF1E1SRET8ERRHCJNYYEH36WK',
              },
              {
                address: '14etN8LW2YB2WA7yBYDecyLFPpxMSaeV1nhxYbJi8uMJcfkD',
                display: '14ETN8LW2YB2WA7YBYDECYLFPPXMSAEV1NHXYBJI8UMJCFKD',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '12pMRYu1yWmdKDQLo9mWcjJYRPwfcnWBWLYh8tKpuJsCi2yF',
                display: '12PMRYU1YWMDKDQLO9MWCJJYRPWFCNWBWLYH8TKPUJSCI2YF',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '12wWLUd5qMzLFGqBsMnHLVFeTuYJwuo5ygMAxuSywrBX1XSF',
                display: '12WWLUD5QMZLFGQBSMNHLVFETUYJWUO5YGMAXUSYWRBX1XSF',
              },
              {
                address: '16A4n4UQqgxw5ndeehPjUAobDNmuX2bBoPXVKj4xTe16ktRN',
                display: '16A4N4UQQGXW5NDEEHPJUAOBDNMUX2BBOPXVKJ4XTE16KTRN',
              },
              {
                address: '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
                display: '12FW46TCQBWNWHBKDS2VWE4CCHYDRTJHIYAXCH6MB6SZSRJ6',
              },
            ],
          },
          {
            account: {
              address: '14mSXQeHpF8NT1tMKu87tAbNDNjm7q9qh8hYa7BY2toNUkTo',
              display: 'Bjorn',
            },
            backing: '152429853964292125',
            formattedBacking: '15.2429  MDOT',
            voters: [
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '16WXKsa3jddMq8MTM671LQjUDYHprnrwEpZHyqCrwBTU3Vzk',
                display: '16WXKSA3JDDMQ8MTM671LQJUDYHPRNRWEPZHYQCRWBTU3VZK',
              },
              {
                address: '14etN8LW2YB2WA7yBYDecyLFPpxMSaeV1nhxYbJi8uMJcfkD',
                display: '14ETN8LW2YB2WA7YBYDECYLFPPXMSAEV1NHXYBJI8UMJCFKD',
              },
              {
                address: '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6',
                display: 'Joe',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '14abckafD6X3PE1LKJHWnSV1PJgKYFVR4dvVE79f7fZWSEua',
                display: '14ABCKAFD6X3PE1LKJHWNSV1PJGKYFVR4DVVE79F7FZWSEUA',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '14BP6oSYP62om8VKh7mScEcZqb472EzanSFJK2E3bwdWGtah',
                display: '14BP6OSYP62OM8VKH7MSCECZQB472EZANSFJK2E3BWDWGTAH',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '14mSXQeHpF8NT1tMKu87tAbNDNjm7q9qh8hYa7BY2toNUkTo',
                display: 'Bjorn',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '1MrurrNb4VTrRJUXT6fGxHFdmwwscqHZUFkMistMsP8k5Nk',
                display: '🛡 DWELLIR DOT 🛡',
              },
              {
                address: '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
                display: '12FW46TCQBWNWHBKDS2VWE4CCHYDRTJHIYAXCH6MB6SZSRJ6',
              },
              {
                address: '136GehDWrz4tqL7ivAT53VeS3PweRZDSHyrbnWLdWJpchW8M',
                display: '136GEHDWRZ4TQL7IVAT53VES3PWERZDSHYRBNWLDWJPCHW8M',
              },
            ],
          },
          {
            account: {
              address: '14mwSGdhdrAA3pGoKSX1tWguFREswWucAsr7kcHbdsf7fU7Q',
              display: 'Yaoqi',
            },
            backing: '147847297947256758',
            formattedBacking: '14.7847  MDOT',
            voters: [
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '14mwSGdhdrAA3pGoKSX1tWguFREswWucAsr7kcHbdsf7fU7Q',
                display: 'Yaoqi',
              },
              {
                address: '13uRt1xfVwxRejGkAvwdanznSkZwG1WQyFghwxKGVfHmtwMr',
                display: '13URT1XFVWXREJGKAVWDANZNSKZWG1WQYFGHWXKGVFHMTWMR',
              },
              {
                address: '19u6pqqWaZtHtqMegtX7Ra2SxvFb44yuW7vMjGGK99PUVpA',
                display: '19U6PQQWAZTHTQMEGTX7RA2SXVFB44YUW7VMJGGK99PUVPA',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '14NGUTHPtUvjbJttSF4qYmX8mUKk75UweWsL3GZyHw4ue2pv',
                display: 'finalbits',
              },
              {
                address: '13ofm5Yg4FmACJ3torjifcw4z8yPKs4eNZFXXsBkHeJz3qHm',
                display: '13OFM5YG4FMACJ3TORJIFCW4Z8YPKS4ENZFXXSBKHEJZ3QHM',
              },
              {
                address: '13NWxzU1foRaGMoWGcwsKwxPJpaqQb8wSzADw4qDcuKRRWfD',
                display: '13NWXZU1FORAGMOWGCWSKWXPJPAQQB8WSZADW4QDCUKRRWFD',
              },
              {
                address: '14DGwsu8ZS5FjReggRgkqNXa3TYtoPJuWUpQodZYboxZbjqo',
                display: '14DGWSU8ZS5FJREGGRGKQNXA3TYTOPJUWUPQODZYBOXZBJQO',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '15FvfitLXpn4tMSgs2RqaPiATcxfVZRGdsneRxeHX4o7x4wN',
                display: '15FVFITLXPN4TMSGS2RQAPIATCXFVZRGDSNERXEHX4O7X4WN',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '14gAowz3LaAqYkRjqUZkjZUxKFUzLtN2oZJSfr3ziHBRhwgc',
                display: '14GAOWZ3LAAQYKRJQUZKJZUXKFUZLTN2OZJSFR3ZIHBRHWGC',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '1gn7eoheUsotsLGvJMakSZLBNAih3bCscJhBucezSE44pt8',
                display: '1GN7EOHEUSOTSLGVJMAKSZLBNAIH3BCSCJHBUCEZSE44PT8',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '16X6fA9y2kPoUDN3wo2Y5PhAfYCd7R8b8soH9jKo754TEoHh',
                display: '16X6FA9Y2KPOUDN3WO2Y5PHAFYCD7R8B8SOH9JKO754TEOHH',
              },
              {
                address: '15o4BQzgejG1MH4JynNRchC425Ehhn2X6JYUQRdwJ6L9TqWq',
                display: '15O4BQZGEJG1MH4JYNNRCHC425EHHN2X6JYUQRDWJ6L9TQWQ',
              },
              {
                address: '15tchmYRA5e1RQZs6PE2Xfq9oxfv86JQBi2yz372sXjovrd7',
                display: '15TCHMYRA5E1RQZS6PE2XFQ9OXFV86JQBI2YZ372SXJOVRD7',
              },
              {
                address: '1243tzEb446NSpWzPcaeMGpJh2YZ4TwMb4B85yVCt4275fD8',
                display: '1243TZEB446NSPWZPCAEMGPJH2YZ4TWMB4B85YVCT4275FD8',
              },
              {
                address: '15BQUqtqhmqJPyvvEH5GYyWffXWKuAgoSUHuG1UeNdb8oDNT',
                display: 'HashQuark',
              },
              {
                address: '15btAXZav2sm8SDd4LNeh4S1REqci87ssZhsARpoeN34NfYi',
                display: '15BTAXZAV2SM8SDD4LNEH4S1REQCI87SSZHSARPOEN34NFYI',
              },
            ],
          },
          {
            account: {
              address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
              display: 'Shawn Tabrizi',
            },
            backing: '145826986246794607',
            formattedBacking: '14.5826  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '14fhQS5myHCh3AQZZoELKpQuy2AfNe5am3PzTDvKi7i172n5',
                display: 'Vegas_life',
              },
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '124X3VPduasSodAjS6MPd5nEqM8SUdKN5taMUUPtkWqF1fVf',
                display: 'STAKEPILE',
              },
              {
                address: '12BkPLskXyXrHhktrinLxVFkPzzvCzCyVCaqHkUEoxMwSzeq',
                display: 'PromoTeam Validator',
              },
              {
                address: '13bptFJSHHLTBDHupxCRR5ErnLSeHFyeUEU5ufNnBL3JeMpG',
                display: '13BPTFJSHHLTBDHUPXCRR5ERNLSEHFYEUEU5UFNNBL3JEMPG',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '13mjnUDrHwYGATFB1FkFkZ1U3kYFsAQfHYTdcc8p3HP1xzZA',
                display: 'Ruby-Node💎',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14hM4oLJCK6wtS7gNfwTDhthRjy5QJ1t3NAcoPjEepo9AH67',
                display: '14HM4OLJCK6WTS7GNFWTDHTHRJY5QJ1T3NACOPJEEPO9AH67',
              },
              {
                address: '15DtxgAQ1XK5ywkx686AdFgLGkFDinoYLx2DyiZBuzUtZZnf',
                display: '15DTXGAQ1XK5YWKX686ADFGLGKFDINOYLX2DYIZBUZUTZZNF',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8',
                display: '1JA1EH3J8RMB4DR9BRPREXEUASU22DEBFCAKGHO6VAQJDD8',
              },
              {
                address: '1LUckyocmz9YzeQZHVpBvYYRGXb3rnSm2tvfz79h3G3JDgP',
                display: '1LUCKYOCMZ9YZEQZHVPBVYYRGXB3RNSM2TVFZ79H3G3JDGP',
              },
              {
                address: '14BRaQT6JV6tCPPH1shiNJ4PF1e1sRet8errHcjNyYeH36wK',
                display: '14BRAQT6JV6TCPPH1SHINJ4PF1E1SRET8ERRHCJNYYEH36WK',
              },
              {
                address: '16cAoz6aW1aYSn6xPx1M8ckyw8PPsQRoVizkB34iypmpxouV',
                display: '16CAOZ6AW1AYSN6XPX1M8CKYW8PPSQROVIZKB34IYPMPXOUV',
              },
              {
                address: '14NGUTHPtUvjbJttSF4qYmX8mUKk75UweWsL3GZyHw4ue2pv',
                display: 'finalbits',
              },
              {
                address: '16fttU3nadc7KgFwxUqLyyryUiqW5VMbVMpTQ18GzNtbK9Tz',
                display: '16FTTU3NADC7KGFWXUQLYYRYUIQW5VMBVMPTQ18GZNTBK9TZ',
              },
              {
                address: '13pZskDR7Pt67NtcChSr4uFRBf9ZS52nQeyrceSykq8MDrMe',
                display: '13PZSKDR7PT67NTCCHSR4UFRBF9ZS52NQEYRCESYKQ8MDRME',
              },
              {
                address: '13ozGG4C5CnB2aQyrdxsf1yf5n4u6252J2Gd9neWk6Zz3psW',
                display: 'ForklessNation',
              },
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2',
                display: '12GPFMRQNSDHC9C5DUXYXBFA23IO5FSGTKTSAIMQTAWGUED2',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '13YDWFhtW9AGVcVAqymwgLsCG7uLyFCpiT5jRqRoUG54sSLE',
                display: '13YDWFHTW9AGVCVAQYMWGLSCG7ULYFCPIT5JRQROUG54SSLE',
              },
              {
                address: '16g43B7VPfTmpXQujSz3aKbqY9twSrDreHFWtwp4P7bLkQPp',
                display: 'Staking4All 🥩',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '16YGKSNQ2p2SXC2LuGsoBHrm8nKJgnkW9wpvJE6ahBvs6wpe',
                display: '16YGKSNQ2P2SXC2LUGSOBHRM8NKJGNKW9WPVJE6AHBVS6WPE',
              },
              {
                address: '14d2kv44xf9nFnYdms32dYPKQsr5C9urbDzTz7iwU8iHb9az',
                display: 'Coinstudio',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '16JCybAA88yQ9t8Cus4YhB5mT5DjyBxBLEgYPCpH8HjnePTq',
                display: '16JCYBAA88YQ9T8CUS4YHB5MT5DJYBXBLEGYPCPH8HJNEPTQ',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '155woeQGxnm2hPnA6LtCYk8Zr2L7FTnWAkfbLi986JU1AADo',
                display: '155WOEQGXNM2HPNA6LTCYK8ZR2L7FTNWAKFBLI986JU1AADO',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '149riLdwAVzXg7Cm88RcXhbuFi3zUgwrGsJSSPjC47PRxHQW',
                display: '149RILDWAVZXG7CM88RCXHBUFI3ZUGWRGSJSSPJC47PRXHQW',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '15KX9B5ksRHq3vw1Un4D7DvrodZqoS2FLkZV38CSkR4FnZjh',
                display: '15KX9B5KSRHQ3VW1UN4D7DVRODZQOS2FLKZV38CSKR4FNZJH',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '13z6tqM18GgaeVD6H9ciwfyQp5dogD58hWJThu5iXKtHfixb',
                display: '13Z6TQM18GGAEVD6H9CIWFYQP5DOGD58HWJTHU5IXKTHFIXB',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '14BeKcfcvJSJjvu9GZ2CA8EQ3XkK9J1HdwDrfz5Sg5ERDnrP',
                display: 'ETHICAL VALIDATORS 0',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
              {
                address: '14AakQ4jAmr2ytcrhfmaiHMpj5F9cR6wK1jRrdfC3N1oTbUz',
                display: '14AAKQ4JAMR2YTCRHFMAIHMPJ5F9CR6WK1JRRDFC3N1OTBUZ',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '1y6CPLgccsysCEii3M7jQF834GZsz9A3HMcZz3w7RjGPpBL',
                display: '1Y6CPLGCCSYSCEII3M7JQF834GZSZ9A3HMCZZ3W7RJGPPBL',
              },
              {
                address: '15wznkm7fMaJLFaw7B8KrJWkNcWsDziyTKVjrpPhRLMyXsr5',
                display: '🌐 decentraDOT.com 🌐',
              },
              {
                address: '14Xm59iGrpwfBSMQaGdJBQ1krZjvipiL6mGidXY6JKUkJKS8',
                display: '14XM59IGRPWFBSMQAGDJBQ1KRZJVIPIL6MGIDXY6JKUKJKS8',
              },
              {
                address: '124RsxuvWs31iWyUMvDsnoRUgLQfntxeBXnwWJd8eC7EVe1L',
                display: '124RSXUVWS31IWYUMVDSNORUGLQFNTXEBXNWWJD8EC7EVE1L',
              },
              {
                address: '1dvvq2sZg55LfLqFmegU493oUaPWxJfjiYysP1eyovkX6hP',
                display: 'Afr',
              },
              {
                address: '13QxC9xuQyP45mAhWCCEnxXYN7eo8pc3Ah6oGaD4MeTUj52v',
                display: '13QXC9XUQYP45MAHWCCENXXYN7EO8PC3AH6OGAD4METUJ52V',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '16A4n4UQqgxw5ndeehPjUAobDNmuX2bBoPXVKj4xTe16ktRN',
                display: '16A4N4UQQGXW5NDEEHPJUAOBDNMUX2BBOPXVKJ4XTE16KTRN',
              },
              {
                address: '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
                display: '12FW46TCQBWNWHBKDS2VWE4CCHYDRTJHIYAXCH6MB6SZSRJ6',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '13eKBARPFWBdXJAKg4fBTNUfcz4YAYfDTetRRApuz1kTDVDg',
                display: '13EKBARPFWBDXJAKG4FBTNUFCZ4YAYFDTETRRAPUZ1KTDVDG',
              },
            ],
          },
          {
            account: {
              address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
              display: 'Jaco',
            },
            backing: '144941327067766154',
            formattedBacking: '14.4941  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '14fhQS5myHCh3AQZZoELKpQuy2AfNe5am3PzTDvKi7i172n5',
                display: 'Vegas_life',
              },
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '13KoLANqZqUtyfj6hVDzLh3euJZmabuhepT8xG2VrNsF5XjA',
                display: '13KOLANQZQUTYFJ6HVDZLH3EUJZMABUHEPT8XG2VRNSF5XJA',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '13rfeFLNLU8TfKizGiBLZWaYAwKrAK4JBz5vtU4vK6R427Em',
                display: 'Nodamatics',
              },
              {
                address: '14gV6s4whdfezXgnT6tJ79nCKLy2GutDpnEVSMBR9TmDpw5m',
                display: '14GV6S4WHDFEZXGNT6TJ79NCKLY2GUTDPNEVSMBR9TMDPW5M',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '14xQXJdUDC1pzyt8y3z27ANiUBgP7zTSaYutaLELJoyQrdLP',
                display: 'integritee',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '1eyC4V2g9evgUTJHib4sq53FCNBbgCw9UV61agWtYG1Zsjh',
                display: '1EYC4V2G9EVGUTJHIB4SQ53FCNBBGCW9UV61AGWTYG1ZSJH',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8',
                display: '1JA1EH3J8RMB4DR9BRPREXEUASU22DEBFCAKGHO6VAQJDD8',
              },
              {
                address: '14gYRjn6fn5hu45zEAtXodPDbtaditK8twoWUXFi6DsLwd31',
                display: '14GYRJN6FN5HU45ZEATXODPDBTADITK8TWOWUXFI6DSLWD31',
              },
              {
                address: '12dGS1zjyiUqj7GuxDDwv9i72RMye1mT7tSWNaSx7QVeJ32H',
                display: '12DGS1ZJYIUQJ7GUXDDWV9I72RMYE1MT7TSWNASX7QVEJ32H',
              },
              {
                address: '16cAoz6aW1aYSn6xPx1M8ckyw8PPsQRoVizkB34iypmpxouV',
                display: '16CAOZ6AW1AYSN6XPX1M8CKYW8PPSQROVIZKB34IYPMPXOUV',
              },
              {
                address: '1skdjscBXwsdefCYdFLnGCcr5GNDBPFYXMjt9Jpvc6KDUBx',
                display: '1SKDJSCBXWSDEFCYDFLNGCCR5GNDBPFYXMJT9JPVC6KDUBX',
              },
              {
                address: '14NGUTHPtUvjbJttSF4qYmX8mUKk75UweWsL3GZyHw4ue2pv',
                display: 'finalbits',
              },
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '15psTaipmWG86U5vNkF7Guv9TRPMRLKHkGS8cXT74v3RCC5t',
                display: '🤖 PolkaStats',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '14KiTu1AqxdwhwG2tmKXUjNeuEUPMmsZAhSekg6DqgimHNxG',
                display: '14KITU1AQXDWHWG2TMKXUJNEUEUPMMSZAHSEKG6DQGIMHNXG',
              },
              {
                address: '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6',
                display: 'Joe',
              },
              {
                address: '16iiKwFsRKRsjAiEpD4zgNgEX84nzHtHHNFKXhz1sHtan3ne',
                display: 'CryptoLab 01',
              },
              {
                address: '16g43B7VPfTmpXQujSz3aKbqY9twSrDreHFWtwp4P7bLkQPp',
                display: 'Staking4All 🥩',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '16JCybAA88yQ9t8Cus4YhB5mT5DjyBxBLEgYPCpH8HjnePTq',
                display: '16JCYBAA88YQ9T8CUS4YHB5MT5DJYBXBLEGYPCPH8HJNEPTQ',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '13xd2v7rnzYNUqG6ez5jmnA36ZqkcUJQYTEikEnVA1zxi8wS',
                display: '13XD2V7RNZYNUQG6EZ5JMNA36ZQKCUJQYTEIKENVA1ZXI8WS',
              },
              {
                address: '1dGsgLgFez7gt5WjX2FYzNCJtaCjGG6W9dA42d9cHngDYGg',
                display: '1DGSGLGFEZ7GT5WJX2FYZNCJTACJGG6W9DA42D9CHNGDYGG',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '149riLdwAVzXg7Cm88RcXhbuFi3zUgwrGsJSSPjC47PRxHQW',
                display: '149RILDWAVZXG7CM88RCXHBUFI3ZUGWRGSJSSPJC47PRXHQW',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '16GDRhRYxk42paoK6TfHAqWej8PdDDUwdDazjv4bAn4KGNeb',
                display: 'CP287-CLOUDWALK',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '13z6tqM18GgaeVD6H9ciwfyQp5dogD58hWJThu5iXKtHfixb',
                display: '13Z6TQM18GGAEVD6H9CIWFYQP5DOGD58HWJTHU5IXKTHFIXB',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '13iacJEHdiTXfxrJ1UPiPAUAv4iXFYdbHbqEDmmdTNhz3h1L',
                display: 'LLoyds.tech',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
              {
                address: '15BZW721S3fzMYT8vY3Dt2sVXNTECqwHQ1bNUM8q4fi7EVcc',
                display: 'ilgio',
              },
              {
                address: '12HdAahUqLBXAb3ijZwV7RZM9U6vdrpWDvrJzk3PY8qsg78B',
                display: '12HDAAHUQLBXAB3IJZWV7RZM9U6VDRPWDVRJZK3PY8QSG78B',
              },
              {
                address: '13kz33kotYa3M75u5avMS367zJY3Fx2y5ZYASEPunqfEeCjD',
                display: 'WOJDOT   ʕ •ᴥ•ʔ',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '14AakQ4jAmr2ytcrhfmaiHMpj5F9cR6wK1jRrdfC3N1oTbUz',
                display: '14AAKQ4JAMR2YTCRHFMAIHMPJ5F9CR6WK1JRRDFC3N1OTBUZ',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '14Xm59iGrpwfBSMQaGdJBQ1krZjvipiL6mGidXY6JKUkJKS8',
                display: '14XM59IGRPWFBSMQAGDJBQ1KRZJVIPIL6MGIDXY6JKUKJKS8',
              },
              {
                address: '1dvvq2sZg55LfLqFmegU493oUaPWxJfjiYysP1eyovkX6hP',
                display: 'Afr',
              },
              {
                address: '15tfUt4iQNjMyhZiJGBf4EpETE2KqtW1nfJwbBT1MvWjvcK9',
                display: 'Tesla',
              },
              {
                address: '13QxC9xuQyP45mAhWCCEnxXYN7eo8pc3Ah6oGaD4MeTUj52v',
                display: '13QXC9XUQYP45MAHWCCENXXYN7EO8PC3AH6OGAD4METUJ52V',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '12Ea3kSFDH3Meg5Br63o5BXZh4ELvhapCj96ygaXiTtpVhUM',
                display: '12EA3KSFDH3MEG5BR63O5BXZH4ELVHAPCJ96YGAXITTPVHUM',
              },
              {
                address: '13Hp4FEF7z7famvakw8cgioHqDxcnhnyQkvd1jF4dxn7cayG',
                display: 'VISIONSTAKE 👁‍🗨',
              },
              {
                address: '13K6QTYBPMUFTbhZzqToKcfCiWbt4wDPHr3rUPyUessiPR61',
                display: 'Genesis Lab',
              },
              {
                address: '152vvyzFJn9pqM2mLiiJhmZXWxaAxmPx7fycwJUrETB1g72G',
                display: '152VVYZFJN9PQM2MLIIJHMZXWXAAXMPX7FYCWJURETB1G72G',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '1MrurrNb4VTrRJUXT6fGxHFdmwwscqHZUFkMistMsP8k5Nk',
                display: '🛡 DWELLIR DOT 🛡',
              },
              {
                address: '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
                display: '12FW46TCQBWNWHBKDS2VWE4CCHYDRTJHIYAXCH6MB6SZSRJ6',
              },
              {
                address: '1EWbJs2jdh34mhH8ovwQTNiLmQ87mMksJW3raRMxk6WXY29',
                display: '1EWBJS2JDH34MHH8OVWQTNILMQ87MMKSJW3RARMXK6WXY29',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '13eKBARPFWBdXJAKg4fBTNUfcz4YAYfDTetRRApuz1kTDVDg',
                display: '13EKBARPFWBDXJAKG4FBTNUFCZ4YAYFDTETRRAPUZ1KTDVDG',
              },
            ],
          },
          {
            account: {
              address: '12xG1Bn4421hUQAxKwZd9WSxZCJQwJBbwr6aZ4ZxvuR7A1Ao',
              display: '12XG1BN4421HUQAXKWZD9WSXZCJQWJBBWR6AZ4ZXVUR7A1AO',
            },
            backing: '143550286687016477',
            formattedBacking: '14.3550  MDOT',
            voters: [
              {
                address: '1W5eXTvLuFY5E9scBcPVk98QKvfgWsgcME38PGbFX6c5Evz',
                display: '1W5EXTVLUFY5E9SCBCPVK98QKVFGWSGCME38PGBFX6C5EVZ',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '13dykMMJpFEh3W1NUtBbPNB4NvtF2Kt6mzdRNWWRu9mkDmK9',
                display: '13DYKMMJPFEH3W1NUTBBPNB4NVTF2KT6MZDRNWWRU9MKDMK9',
              },
              {
                address: '16DGiP6jDwAfkAeqGfkUCtheKgUzTy7UeaiFFBAv8BwX3RhN',
                display: '16DGIP6JDWAFKAEQGFKUCTHEKGUZTY7UEAIFFBAV8BWX3RHN',
              },
              {
                address: '13uwV8CBHjv25W3GACLPzzvTu2v9USc2yCQdhrqPhyM3vx6w',
                display: 'Simply Staking',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '15UyiZ9rYhrX39Rasc1iE4sdME7WHNFSj8RQT3yuuytd3Nrd',
                display: 'KIRA Staking',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '12YqzycfMFoj6H5BYGrq8zBSCEUunVSitqPUuK1xLjpRMzpc',
                display: '12YQZYCFMFOJ6H5BYGRQ8ZBSCEUUNVSITQPUUK1XLJPRMZPC',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR',
                display: '13FV7BTQKR2NQVZSAJAK1DHXKPXGJZE8TWAWNWDK8B1U6VOR',
              },
              {
                address: '1MrurrNb4VTrRJUXT6fGxHFdmwwscqHZUFkMistMsP8k5Nk',
                display: '🛡 DWELLIR DOT 🛡',
              },
              {
                address: '1mx9gKS9DE4H9dvyxCWKMvuKw8bTDu2cgCcFbKNAhYHwyjD',
                display: 'Sensei',
              },
            ],
          },
          {
            account: {
              address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
              display: 'QinWen',
            },
            backing: '142277952459754017',
            formattedBacking: '14.2277  MDOT',
            voters: [
              {
                address: '1BdoL1BP36SZGEKR4iX8ksou2GTnrDd5of99SWK82c3A4aB',
                display: '1BDOL1BP36SZGEKR4IX8KSOU2GTNRDD5OF99SWK82C3A4AB',
              },
              {
                address: '13KoLANqZqUtyfj6hVDzLh3euJZmabuhepT8xG2VrNsF5XjA',
                display: '13KOLANQZQUTYFJ6HVDZLH3EUJZMABUHEPT8XG2VRNSF5XJA',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '12BkPLskXyXrHhktrinLxVFkPzzvCzCyVCaqHkUEoxMwSzeq',
                display: 'PromoTeam Validator',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '13iVNghf2zS3gnSc8KEZP7JMyQwxscu1XmAH7TZUXvMLeB26',
                display: '13IVNGHF2ZS3GNSC8KEZP7JMYQWXSCU1XMAH7TZUXVMLEB26',
              },
              {
                address: '128oCEAkqnvgAYvqpAsdrRVHTNQugSEuKaeDTyRJeXg1Veh9',
                display: '128OCEAKQNVGAYVQPASDRRVHTNQUGSEUKAEDTYRJEXG1VEH9',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '14NGUTHPtUvjbJttSF4qYmX8mUKk75UweWsL3GZyHw4ue2pv',
                display: 'finalbits',
              },
              {
                address: '16fttU3nadc7KgFwxUqLyyryUiqW5VMbVMpTQ18GzNtbK9Tz',
                display: '16FTTU3NADC7KGFWXUQLYYRYUIQW5VMBVMPTQ18GZNTBK9TZ',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '155woeQGxnm2hPnA6LtCYk8Zr2L7FTnWAkfbLi986JU1AADo',
                display: '155WOEQGXNM2HPNA6LTCYK8ZR2L7FTNWAKFBLI986JU1AADO',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '14N8EYvwxh31gnCX1DP7am5u2bWbULiDNaBqTQeuVoXdnt8K',
                display: '14N8EYVWXH31GNCX1DP7AM5U2BWBULIDNABQTQEUVOXDNT8K',
              },
              {
                address: '11gqpAyU17G9EFW5n5MNngh824F3Y2as72V2rgc7Wq5JVRd',
                display: '11GQPAYU17G9EFW5N5MNNGH824F3Y2AS72V2RGC7WQ5JVRD',
              },
              {
                address: '13z6tqM18GgaeVD6H9ciwfyQp5dogD58hWJThu5iXKtHfixb',
                display: '13Z6TQM18GGAEVD6H9CIWFYQP5DOGD58HWJTHU5IXKTHFIXB',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '14bC4qpzeCh41i1dZ1NomN7V9819q3eoHj9AFgyTEpXCmjsU',
                display: '14BC4QPZECH41I1DZ1NOMN7V9819Q3EOHJ9AFGYTEPXCMJSU',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR',
                display: '13FV7BTQKR2NQVZSAJAK1DHXKPXGJZE8TWAWNWDK8B1U6VOR',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '12BMEir1eczcBNKoRh8ahBZ27xHaKrbbyLiPyhgPYj6TdBCV',
                display: '12BMEIR1ECZCBNKORH8AHBZ27XHAKRBBYLIPYHGPYJ6TDBCV',
              },
            ],
          },
          {
            account: {
              address: '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6',
              display: 'Joe',
            },
            backing: '140671417160810882',
            formattedBacking: '14.0671  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '1uFscCqjzMDDGRS8bh9W8f4t94WVXgvnzTeSTrdjC8fJZA6',
                display: 'dotberkeley',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '14fhQS5myHCh3AQZZoELKpQuy2AfNe5am3PzTDvKi7i172n5',
                display: 'Vegas_life',
              },
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '14gV6s4whdfezXgnT6tJ79nCKLy2GutDpnEVSMBR9TmDpw5m',
                display: '14GV6S4WHDFEZXGNT6TJ79NCKLY2GUTDPNEVSMBR9TMDPW5M',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '14xQXJdUDC1pzyt8y3z27ANiUBgP7zTSaYutaLELJoyQrdLP',
                display: 'integritee',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '13zBFyK97dg4hWjXwEpigeVdu69sHa4fc8JYegpB369PAafq',
                display: '13ZBFYK97DG4HWJXWEPIGEVDU69SHA4FC8JYEGPB369PAAFQ',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8',
                display: '1JA1EH3J8RMB4DR9BRPREXEUASU22DEBFCAKGHO6VAQJDD8',
              },
              {
                address: '14gYRjn6fn5hu45zEAtXodPDbtaditK8twoWUXFi6DsLwd31',
                display: '14GYRJN6FN5HU45ZEATXODPDBTADITK8TWOWUXFI6DSLWD31',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2',
                display: '12GPFMRQNSDHC9C5DUXYXBFA23IO5FSGTKTSAIMQTAWGUED2',
              },
              {
                address: '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6',
                display: 'Joe',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '15dFHJonu6cGqv8UMhrZPpomAtqpGtwnb2Ar7fRCq91BZtVq',
                display: 'ryanhigs',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '16JCybAA88yQ9t8Cus4YhB5mT5DjyBxBLEgYPCpH8HjnePTq',
                display: '16JCYBAA88YQ9T8CUS4YHB5MT5DJYBXBLEGYPCPH8HJNEPTQ',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '14BP6oSYP62om8VKh7mScEcZqb472EzanSFJK2E3bwdWGtah',
                display: '14BP6OSYP62OM8VKH7MSCECZQB472EZANSFJK2E3BWDWGTAH',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '155woeQGxnm2hPnA6LtCYk8Zr2L7FTnWAkfbLi986JU1AADo',
                display: '155WOEQGXNM2HPNA6LTCYK8ZR2L7FTNWAKFBLI986JU1AADO',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '149riLdwAVzXg7Cm88RcXhbuFi3zUgwrGsJSSPjC47PRxHQW',
                display: '149RILDWAVZXG7CM88RCXHBUFI3ZUGWRGSJSSPJC47PRXHQW',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '15KX9B5ksRHq3vw1Un4D7DvrodZqoS2FLkZV38CSkR4FnZjh',
                display: '15KX9B5KSRHQ3VW1UN4D7DVRODZQOS2FLKZV38CSKR4FNZJH',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '16YwUZyLdeAoe4KmhivGwuuJpBH1US4qkUtXK2V83MVXUy6x',
                display: 'GTSTAKING',
              },
              {
                address: '13kz33kotYa3M75u5avMS367zJY3Fx2y5ZYASEPunqfEeCjD',
                display: 'WOJDOT   ʕ •ᴥ•ʔ',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR',
                display: '13FV7BTQKR2NQVZSAJAK1DHXKPXGJZE8TWAWNWDK8B1U6VOR',
              },
              {
                address: '1qWTg2KdN7FD6zUd2Xdv8Fd3WRoTjuBoq4xLxne1p1naBsi',
                display: '1QWTG2KDN7FD6ZUD2XDV8FD3WROTJUBOQ4XLXNE1P1NABSI',
              },
              {
                address: '13Hp4FEF7z7famvakw8cgioHqDxcnhnyQkvd1jF4dxn7cayG',
                display: 'VISIONSTAKE 👁‍🗨',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
                display: '12FW46TCQBWNWHBKDS2VWE4CCHYDRTJHIYAXCH6MB6SZSRJ6',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
            ],
          },
          {
            account: {
              address: '13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2',
              display: '13RDY9NRJPYTDBSUDBW12DGWHK19SGWSRVZ2BXKZYHBSAGP2',
            },
            backing: '137575256885404963',
            formattedBacking: '13.7575  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '1uFscCqjzMDDGRS8bh9W8f4t94WVXgvnzTeSTrdjC8fJZA6',
                display: 'dotberkeley',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '14fhQS5myHCh3AQZZoELKpQuy2AfNe5am3PzTDvKi7i172n5',
                display: 'Vegas_life',
              },
              {
                address: '1REEV3CUqiMMfRdeTy9apQwXVabcg2TcQhvsVFtusByZ6ga',
                display: '1REEV3CUQIMMFRDETY9APQWXVABCG2TCQHVSVFTUSBYZ6GA',
              },
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '16HvKyV9B61hsop3ZY6pWYeV537S29kd9pb9FMrPzx49ym5X',
                display: 'TheGuild',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '13GtCixw3EZARj52CVbKLrsAzyc7dmmYhDV6quS5yeVCfnh1',
                display: 'RADIUMBLOCK.COM',
              },
              {
                address: '124X3VPduasSodAjS6MPd5nEqM8SUdKN5taMUUPtkWqF1fVf',
                display: 'STAKEPILE',
              },
              {
                address: '168xfZuHXv13uyrVV2vADpuMa4B3kAtj11gRNHA8YKRH9xuW',
                display: '168XFZUHXV13UYRVV2VADPUMA4B3KATJ11GRNHA8YKRH9XUW',
              },
              {
                address: '12H9FfSYdQ4GrKc7tdxK8U6DitAZMqfnhB8gtHwd2rpCiZfN',
                display: '12H9FFSYDQ4GRKC7TDXK8U6DITAZMQFNHB8GTHWD2RPCIZFN',
              },
              {
                address: '12UCSRxm3sCoX6tCkycf5TMgA3xY7Uyp44NjqFEHM6gRbcxL',
                display: '12UCSRXM3SCOX6TCKYCF5TMGA3XY7UYP44NJQFEHM6GRBCXL',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '14mwSGdhdrAA3pGoKSX1tWguFREswWucAsr7kcHbdsf7fU7Q',
                display: 'Yaoqi',
              },
              {
                address: '15tcHBgQ28uX2kDBHVRnpYgtugQA5vnhHAG6US85XadAr92X',
                display: '15TCHBGQ28UX2KDBHVRNPYGTUGQA5VNHHAG6US85XADAR92X',
              },
              {
                address: '14xQXJdUDC1pzyt8y3z27ANiUBgP7zTSaYutaLELJoyQrdLP',
                display: 'integritee',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '16Jh21ThTh2tW98NuN2gM7Q3KaYiuJLbxCNbuBkFpwcDkRqx',
                display: 'Cypher Labs',
              },
              {
                address: '15iwm1HrcGiTZoZenijMTCayRD3hM2RpKde3LrrNxPKAMjTg',
                display: 'UBIK CAPITAL',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '13iVNghf2zS3gnSc8KEZP7JMyQwxscu1XmAH7TZUXvMLeB26',
                display: '13IVNGHF2ZS3GNSC8KEZP7JMYQWXSCU1XMAH7TZUXVMLEB26',
              },
              {
                address: '1bYfKv8QUnGm5nSSWpQDPneZkVjU7x3XFyD1bHBMHJJVzqx',
                display: '1BYFKV8QUNGM5NSSWPQDPNEZKVJU7X3XFYD1BHBMHJJVZQX',
              },
              {
                address: '12CJw9KNkC7FzVVg3dvny4PWHjjkvdyM17mmNfXyfucp8JfM',
                display: 'Dionysus🍇',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8',
                display: '1JA1EH3J8RMB4DR9BRPREXEUASU22DEBFCAKGHO6VAQJDD8',
              },
              {
                address: '13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2',
                display: '13RDY9NRJPYTDBSUDBW12DGWHK19SGWSRVZ2BXKZYHBSAGP2',
              },
              {
                address: '12dGS1zjyiUqj7GuxDDwv9i72RMye1mT7tSWNaSx7QVeJ32H',
                display: '12DGS1ZJYIUQJ7GUXDDWV9I72RMYE1MT7TSWNASX7QVEJ32H',
              },
              {
                address: '14BRaQT6JV6tCPPH1shiNJ4PF1e1sRet8errHcjNyYeH36wK',
                display: '14BRAQT6JV6TCPPH1SHINJ4PF1E1SRET8ERRHCJNYYEH36WK',
              },
              {
                address: '16CdHjb4nxVwF6uwmPm6A29pc4ubnLiY7UqasMxt7cT9BcoK',
                display: 'NEWDEAL',
              },
              {
                address: '15BMiCvh6cEa7xwCpGmYR4QGsqjZK2FSndjpks6YPT4aC3MK',
                display: 'NewOmegaValidator',
              },
              {
                address: '16cAoz6aW1aYSn6xPx1M8ckyw8PPsQRoVizkB34iypmpxouV',
                display: '16CAOZ6AW1AYSN6XPX1M8CKYW8PPSQROVIZKB34IYPMPXOUV',
              },
              {
                address: '14etN8LW2YB2WA7yBYDecyLFPpxMSaeV1nhxYbJi8uMJcfkD',
                display: '14ETN8LW2YB2WA7YBYDECYLFPPXMSAEV1NHXYBJI8UMJCFKD',
              },
              {
                address: '16fttU3nadc7KgFwxUqLyyryUiqW5VMbVMpTQ18GzNtbK9Tz',
                display: '16FTTU3NADC7KGFWXUQLYYRYUIQW5VMBVMPTQ18GZNTBK9TZ',
              },
              {
                address: '13ozGG4C5CnB2aQyrdxsf1yf5n4u6252J2Gd9neWk6Zz3psW',
                display: 'ForklessNation',
              },
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '15psTaipmWG86U5vNkF7Guv9TRPMRLKHkGS8cXT74v3RCC5t',
                display: '🤖 PolkaStats',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '17e7dVu8uK6ZSMkS5AoQg8d2EyiXnfjMxq5tXMGWCVUFwhJ',
                display: '17E7DVU8UK6ZSMKS5AOQG8D2EYIXNFJMXQ5TXMGWCVUFWHJ',
              },
              {
                address: '12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2',
                display: '12GPFMRQNSDHC9C5DUXYXBFA23IO5FSGTKTSAIMQTAWGUED2',
              },
              {
                address: '13rokpqWneXxGjE8y2YF6H7MtRvqGTqkPR332e3vvMRJet3a',
                display: '13ROKPQWNEXXGJE8Y2YF6H7MTRVQGTQKPR332E3VVMRJET3A',
              },
              {
                address: '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6',
                display: 'Joe',
              },
              {
                address: '16iiKwFsRKRsjAiEpD4zgNgEX84nzHtHHNFKXhz1sHtan3ne',
                display: 'CryptoLab 01',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '13YDWFhtW9AGVcVAqymwgLsCG7uLyFCpiT5jRqRoUG54sSLE',
                display: '13YDWFHTW9AGVCVAQYMWGLSCG7ULYFCPIT5JRQROUG54SSLE',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '16g43B7VPfTmpXQujSz3aKbqY9twSrDreHFWtwp4P7bLkQPp',
                display: 'Staking4All 🥩',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '16YGKSNQ2p2SXC2LuGsoBHrm8nKJgnkW9wpvJE6ahBvs6wpe',
                display: '16YGKSNQ2P2SXC2LUGSOBHRM8NKJGNKW9WPVJE6AHBVS6WPE',
              },
              {
                address: '14sANKW5KWgKiUdpGwwmVpxCnartnCCCx5LLrEvUpGtqo5Cf',
                display: '14SANKW5KWGKIUDPGWWMVPXCNARTNCCCX5LLREVUPGTQO5CF',
              },
              {
                address: '121NqPL1TNk9pGGdzH19LfeV9W97Qjt3huWUbEncM6yaT18V',
                display: '121NQPL1TNK9PGGDZH19LFEV9W97QJT3HUWUBENCM6YAT18V',
              },
              {
                address: '15dFHJonu6cGqv8UMhrZPpomAtqpGtwnb2Ar7fRCq91BZtVq',
                display: 'ryanhigs',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '121YHCtd97fn19zttCTVLdC8mjX81ry53X7MpMNsi93JTFHy',
                display: '121YHCTD97FN19ZTTCTVLDC8MJX81RY53X7MPMNSI93JTFHY',
              },
              {
                address: '13rkfSaFsMEFJAV1wcQcnbJnxiigJTb78qkkLSEvUNPA2QVZ',
                display: 'XUAN',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '14BP6oSYP62om8VKh7mScEcZqb472EzanSFJK2E3bwdWGtah',
                display: '14BP6OSYP62OM8VKH7MSCECZQB472EZANSFJK2E3BWDWGTAH',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '1dGsgLgFez7gt5WjX2FYzNCJtaCjGG6W9dA42d9cHngDYGg',
                display: '1DGSGLGFEZ7GT5WJX2FYZNCJTACJGG6W9DA42D9CHNGDYGG',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '14ShUZUYUR35RBZW6uVVt1zXDxmSQddkeDdXf1JkMA6P721N',
                display: 'Wei',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '149riLdwAVzXg7Cm88RcXhbuFi3zUgwrGsJSSPjC47PRxHQW',
                display: '149RILDWAVZXG7CM88RCXHBUFI3ZUGWRGSJSSPJC47PRXHQW',
              },
              {
                address: '14VQnJFstc2PCsRmmapsriERT2obEeheXfuYKmEVcfc7ZenW',
                display: '14VQNJFSTC2PCSRMMAPSRIERT2OBEEHEXFUYKMEVCFC7ZENW',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '12iqwZGB2sguEhjFi2ZRuWWixU8mHJnSiP1pwDefqGsBy4rV',
                display: 'dakkk',
              },
              {
                address: '12Dw4SzhsxX3fpDiLUYXm9oGbfxcbg1Peq67gc5jkkEo1TKr',
                display: '12DW4SZHSXX3FPDILUYXM9OGBFXCBG1PEQ67GC5JKKEO1TKR',
              },
              {
                address: '16GDRhRYxk42paoK6TfHAqWej8PdDDUwdDazjv4bAn4KGNeb',
                display: 'CP287-CLOUDWALK',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '15KDFYfFjdqhp3MDFEtHuyu9kLpXbT7k1zjx78MphViFdCaU',
                display: 'redpenguin',
              },
              {
                address: '1vTfju3zruADh7sbBznxWCpircNp9ErzJaPQZKyrUknApRu',
                display: '1VTFJU3ZRUADH7SBBZNXWCPIRCNP9ERZJAPQZKYRUKNAPRU',
              },
              {
                address: '11gqpAyU17G9EFW5n5MNngh824F3Y2as72V2rgc7Wq5JVRd',
                display: '11GQPAYU17G9EFW5N5MNNGH824F3Y2AS72V2RGC7WQ5JVRD',
              },
              {
                address: '13z6tqM18GgaeVD6H9ciwfyQp5dogD58hWJThu5iXKtHfixb',
                display: '13Z6TQM18GGAEVD6H9CIWFYQP5DOGD58HWJTHU5IXKTHFIXB',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '15ym3MDSG4WPABNoEtx2rAzBB1EYWJDWbWYpNg1BwuWRAQcY',
                display: 'POLKACHU.COM',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
              {
                address: '15JobZzEavXuPNHdnJYnQpnTbum3TqvtaftmSuPtzhJiiyqR',
                display: 'Stakin',
              },
              {
                address: '15BZW721S3fzMYT8vY3Dt2sVXNTECqwHQ1bNUM8q4fi7EVcc',
                display: 'ilgio',
              },
              {
                address: '16YwUZyLdeAoe4KmhivGwuuJpBH1US4qkUtXK2V83MVXUy6x',
                display: 'GTSTAKING',
              },
              {
                address: '15iA5hpjUecWBbf38Nfegwmtyux25o3LrGaNodfZDxq5nXXE',
                display: '15IA5HPJUECWBBF38NFEGWMTYUX25O3LRGANODFZDXQ5NXXE',
              },
              {
                address: '1627VVB5gtHiseCV8ZdffF7P3bWrLMkU92Q6u3LsG8tGuB63',
                display: 'hirish',
              },
              {
                address: '13kz33kotYa3M75u5avMS367zJY3Fx2y5ZYASEPunqfEeCjD',
                display: 'WOJDOT   ʕ •ᴥ•ʔ',
              },
              {
                address: '1247Twcyzmb46zNZ68yg3ZBPcsAfKRsxhTa2tkbPBs12gwXt',
                display: 'andreita-validator-0',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '13QnPkxXoVVtMgRW66CRvwnkZr1NWtY3qXj3ASxn1iioKexQ',
                display: '13QNPKXXOVVTMGRW66CRVWNKZR1NWTY3QXJ3ASXN1IIOKEXQ',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '16VVNbc4m6aUxwaVwgRra6Ue7fMNGcRQHTFo1TqxmnCyuwwn',
                display: '16VVNBC4M6AUXWAVWGRRA6UE7FMNGCRQHTFO1TQXMNCYUWWN',
              },
              {
                address: '12RXTLiaYh59PokjZVhQvKzcfBEB5CvDnjKKUmDUotzcTH3S',
                display: '12RXTLIAYH59POKJZVHQVKZCFBEB5CVDNJKKUMDUOTZCTH3S',
              },
              {
                address: '15JjaHXBC6whzYhWiEi7uExsTboAC4tibbeBKPxh5CVk5Jfq',
                display: 'Compute Crypto',
              },
              {
                address: '1dvvq2sZg55LfLqFmegU493oUaPWxJfjiYysP1eyovkX6hP',
                display: 'Afr',
              },
              {
                address: '12NA6MLPxKtsRDPg7vYdbnjefScm6Zg7UqGXnAD4UnaxYkqU',
                display: '12NA6MLPXKTSRDPG7VYDBNJEFSCM6ZG7UQGXNAD4UNAXYKQU',
              },
              {
                address: '13QxC9xuQyP45mAhWCCEnxXYN7eo8pc3Ah6oGaD4MeTUj52v',
                display: '13QXC9XUQYP45MAHWCCENXXYN7EO8PC3AH6OGAD4METUJ52V',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR',
                display: '13FV7BTQKR2NQVZSAJAK1DHXKPXGJZE8TWAWNWDK8B1U6VOR',
              },
              {
                address: '16akmCShQuYAzGF4dNXeAxDNr44BZoVu8e8FAoQh8ZQFvB34',
                display: '16AKMCSHQUYAZGF4DNXEAXDNR44BZOVU8E8FAOQH8ZQFVB34',
              },
              {
                address: '13Hp4FEF7z7famvakw8cgioHqDxcnhnyQkvd1jF4dxn7cayG',
                display: 'VISIONSTAKE 👁‍🗨',
              },
              {
                address: '1429tQ2RK8xCwiVYYw7YVUFGX2rbASQN2maMExay7x18neoZ',
                display: '1429TQ2RK8XCWIVYYW7YVUFGX2RBASQN2MAMEXAY7X18NEOZ',
              },
              {
                address: '13K6QTYBPMUFTbhZzqToKcfCiWbt4wDPHr3rUPyUessiPR61',
                display: 'Genesis Lab',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '16UvTJteZiHfoGjzMK5fAxwZd3wkbsFb2C1SKsMLCtxRhNWv',
                display: 'Mitch-Wariner',
              },
              {
                address: '16A4n4UQqgxw5ndeehPjUAobDNmuX2bBoPXVKj4xTe16ktRN',
                display: '16A4N4UQQGXW5NDEEHPJUAOBDNMUX2BBOPXVKJ4XTE16KTRN',
              },
              {
                address: '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
                display: '12FW46TCQBWNWHBKDS2VWE4CCHYDRTJHIYAXCH6MB6SZSRJ6',
              },
              {
                address: '1EWbJs2jdh34mhH8ovwQTNiLmQ87mMksJW3raRMxk6WXY29',
                display: '1EWBJS2JDH34MHH8OVWQTNILMQ87MMKSJW3RARMXK6WXY29',
              },
              {
                address: '13J6LkvsEtdZpvRwUMVNbag26md9ycmGe5PM8UnEokhL6Tgk',
                display: '13J6LKVSETDZPVRWUMVNBAG26MD9YCMGE5PM8UNEOKHL6TGK',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '136GehDWrz4tqL7ivAT53VeS3PweRZDSHyrbnWLdWJpchW8M',
                display: '136GEHDWRZ4TQL7IVAT53VES3PWERZDSHYRBNWLDWJPCHW8M',
              },
              {
                address: '13eKBARPFWBdXJAKg4fBTNUfcz4YAYfDTetRRApuz1kTDVDg',
                display: '13EKBARPFWBDXJAKG4FBTNUFCZ4YAYFDTETRRAPUZ1KTDVDG',
              },
            ],
          },
          {
            account: {
              address: '14mR4xpU4BwYTTFNwMJ7KJ81yqNiNxGUFL4e3GxVsN27YNTE',
              display: 'Fabi',
            },
            backing: '126509177037469790',
            formattedBacking: '12.6509  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '13rfeFLNLU8TfKizGiBLZWaYAwKrAK4JBz5vtU4vK6R427Em',
                display: 'Nodamatics',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '13rokpqWneXxGjE8y2YF6H7MtRvqGTqkPR332e3vvMRJet3a',
                display: '13ROKPQWNEXXGJE8Y2YF6H7MTRVQGTQKPR332E3VVMRJET3A',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '14gAowz3LaAqYkRjqUZkjZUxKFUzLtN2oZJSfr3ziHBRhwgc',
                display: '14GAOWZ3LAAQYKRJQUZKJZUXKFUZLTN2OZJSFR3ZIHBRHWGC',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR',
                display: '13FV7BTQKR2NQVZSAJAK1DHXKPXGJZE8TWAWNWDK8B1U6VOR',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '14mR4xpU4BwYTTFNwMJ7KJ81yqNiNxGUFL4e3GxVsN27YNTE',
                display: 'Fabi',
              },
            ],
          },
          {
            account: {
              address: '14ShUZUYUR35RBZW6uVVt1zXDxmSQddkeDdXf1JkMA6P721N',
              display: 'Wei',
            },
            backing: '111831971617866540',
            formattedBacking: '11.1831  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '14fhQS5myHCh3AQZZoELKpQuy2AfNe5am3PzTDvKi7i172n5',
                display: 'Vegas_life',
              },
              {
                address: '1REEV3CUqiMMfRdeTy9apQwXVabcg2TcQhvsVFtusByZ6ga',
                display: '1REEV3CUQIMMFRDETY9APQWXVABCG2TCQHVSVFTUSBYZ6GA',
              },
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '14gV6s4whdfezXgnT6tJ79nCKLy2GutDpnEVSMBR9TmDpw5m',
                display: '14GV6S4WHDFEZXGNT6TJ79NCKLY2GUTDPNEVSMBR9TMDPW5M',
              },
              {
                address: '13GtCixw3EZARj52CVbKLrsAzyc7dmmYhDV6quS5yeVCfnh1',
                display: 'RADIUMBLOCK.COM',
              },
              {
                address: '16fmwCAoqJdVtmj7wGEGuFa24WT7x974ZEQsa42x8k9uop1o',
                display: 'Lightning Blocks',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '14hM4oLJCK6wtS7gNfwTDhthRjy5QJ1t3NAcoPjEepo9AH67',
                display: '14HM4OLJCK6WTS7GNFWTDHTHRJY5QJ1T3NACOPJEEPO9AH67',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '1LUckyocmz9YzeQZHVpBvYYRGXb3rnSm2tvfz79h3G3JDgP',
                display: '1LUCKYOCMZ9YZEQZHVPBVYYRGXB3RNSM2TVFZ79H3G3JDGP',
              },
              {
                address: '12dGS1zjyiUqj7GuxDDwv9i72RMye1mT7tSWNaSx7QVeJ32H',
                display: '12DGS1ZJYIUQJ7GUXDDWV9I72RMYE1MT7TSWNASX7QVEJ32H',
              },
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2',
                display: '12GPFMRQNSDHC9C5DUXYXBFA23IO5FSGTKTSAIMQTAWGUED2',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '121NqPL1TNk9pGGdzH19LfeV9W97Qjt3huWUbEncM6yaT18V',
                display: '121NQPL1TNK9PGGDZH19LFEV9W97QJT3HUWUBENCM6YAT18V',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '1dGsgLgFez7gt5WjX2FYzNCJtaCjGG6W9dA42d9cHngDYGg',
                display: '1DGSGLGFEZ7GT5WJX2FYZNCJTACJGG6W9DA42D9CHNGDYGG',
              },
              {
                address: '14ShUZUYUR35RBZW6uVVt1zXDxmSQddkeDdXf1JkMA6P721N',
                display: 'Wei',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '149riLdwAVzXg7Cm88RcXhbuFi3zUgwrGsJSSPjC47PRxHQW',
                display: '149RILDWAVZXG7CM88RCXHBUFI3ZUGWRGSJSSPJC47PRXHQW',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '12iqwZGB2sguEhjFi2ZRuWWixU8mHJnSiP1pwDefqGsBy4rV',
                display: 'dakkk',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '15KDFYfFjdqhp3MDFEtHuyu9kLpXbT7k1zjx78MphViFdCaU',
                display: 'redpenguin',
              },
              {
                address: '14gAowz3LaAqYkRjqUZkjZUxKFUzLtN2oZJSfr3ziHBRhwgc',
                display: '14GAOWZ3LAAQYKRJQUZKJZUXKFUZLTN2OZJSFR3ZIHBRHWGC',
              },
              {
                address: '14u2zVFBpH6tTjHrEtGngTiyrsUcqy8idEYymTVBGtkvaBKY',
                display: '14U2ZVFBPH6TTJHRETGNGTIYRSUCQY8IDEYYMTVBGTKVABKY',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '15ym3MDSG4WPABNoEtx2rAzBB1EYWJDWbWYpNg1BwuWRAQcY',
                display: 'POLKACHU.COM',
              },
              {
                address: '153Fz22gxQP8HM8RbnvEt9XWsXu9nR8jxZC2MbQFmuKhN62f',
                display: '153FZ22GXQP8HM8RBNVET9XWSXU9NR8JXZC2MBQFMUKHN62F',
              },
              {
                address: '16YwUZyLdeAoe4KmhivGwuuJpBH1US4qkUtXK2V83MVXUy6x',
                display: 'GTSTAKING',
              },
              {
                address: '1627VVB5gtHiseCV8ZdffF7P3bWrLMkU92Q6u3LsG8tGuB63',
                display: 'hirish',
              },
              {
                address: '13kz33kotYa3M75u5avMS367zJY3Fx2y5ZYASEPunqfEeCjD',
                display: 'WOJDOT   ʕ •ᴥ•ʔ',
              },
              {
                address: '1247Twcyzmb46zNZ68yg3ZBPcsAfKRsxhTa2tkbPBs12gwXt',
                display: 'andreita-validator-0',
              },
              {
                address: '14AakQ4jAmr2ytcrhfmaiHMpj5F9cR6wK1jRrdfC3N1oTbUz',
                display: '14AAKQ4JAMR2YTCRHFMAIHMPJ5F9CR6WK1JRRDFC3N1OTBUZ',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '12RXTLiaYh59PokjZVhQvKzcfBEB5CvDnjKKUmDUotzcTH3S',
                display: '12RXTLIAYH59POKJZVHQVKZCFBEB5CVDNJKKUMDUOTZCTH3S',
              },
              {
                address: '14MDvXHcSfZXacZR3nvbS4XYgpWi2dY65BnthsUnMZU6R1kH',
                display: '14MDVXHCSFZXACZR3NVBS4XYGPWI2DY65BNTHSUNMZU6R1KH',
              },
              {
                address: '152vvyzFJn9pqM2mLiiJhmZXWxaAxmPx7fycwJUrETB1g72G',
                display: '152VVYZFJN9PQM2MLIIJHMZXWXAAXMPX7FYCWJURETB1G72G',
              },
              {
                address: '16UvTJteZiHfoGjzMK5fAxwZd3wkbsFb2C1SKsMLCtxRhNWv',
                display: 'Mitch-Wariner',
              },
              {
                address: '1EWbJs2jdh34mhH8ovwQTNiLmQ87mMksJW3raRMxk6WXY29',
                display: '1EWBJS2JDH34MHH8OVWQTNILMQ87MMKSJW3RARMXK6WXY29',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '13pYWKctR5s8vQuyZt3pxQXue4SRH9coyAS9S9z5HtogAnhs',
                display: 'openbitlab',
              },
              {
                address: '13eKBARPFWBdXJAKg4fBTNUfcz4YAYfDTetRRApuz1kTDVDg',
                display: '13EKBARPFWBDXJAKG4FBTNUFCZ4YAYFDTETRRAPUZ1KTDVDG',
              },
            ],
          },
          {
            account: {
              address: '12Y8b4C9ar162cBgycxYgxxHG7cLVs8gre9Y5xeMjW3izqer',
              display: 'Acala Foundation',
            },
            backing: '106647016472940508',
            formattedBacking: '10.6647  MDOT',
            voters: [
              {
                address: '15MheMCrMwBKoc2CDguqMYaRf9GmJ9PJdsPdQuRkMRTcfczo',
                display: '15MHEMCRMWBKOC2CDGUQMYARF9GMJ9PJDSPDQURKMRTCFCZO',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '13rfeFLNLU8TfKizGiBLZWaYAwKrAK4JBz5vtU4vK6R427Em',
                display: 'Nodamatics',
              },
              {
                address: '14gV6s4whdfezXgnT6tJ79nCKLy2GutDpnEVSMBR9TmDpw5m',
                display: '14GV6S4WHDFEZXGNT6TJ79NCKLY2GUTDPNEVSMBR9TMDPW5M',
              },
              {
                address: '13GtCixw3EZARj52CVbKLrsAzyc7dmmYhDV6quS5yeVCfnh1',
                display: 'RADIUMBLOCK.COM',
              },
              {
                address: '15PeEsbJeU2BZDgoCmo6xdzsuRaZv1PxLaCUyFmfWPwkZPJ4',
                display: '15PEESBJEU2BZDGOCMO6XDZSURAZV1PXLACUYFMFWPWKZPJ4',
              },
              {
                address: '12UCSRxm3sCoX6tCkycf5TMgA3xY7Uyp44NjqFEHM6gRbcxL',
                display: '12UCSRXM3SCOX6TCKYCF5TMGA3XY7UYP44NJQFEHM6GRBCXL',
              },
              {
                address: '13EEEhiXeCFpFjVQxmjJsHjr9LFvnAurcnwQ1FDgB5LmJwQp',
                display: 'Swiss Bond',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '16Y3FmTiJ3ZYAUZrf5rZtxrQJzcHsDBdscpu2zgMD2xN6NY7',
                display: 'PDP_Validator',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '15DtxgAQ1XK5ywkx686AdFgLGkFDinoYLx2DyiZBuzUtZZnf',
                display: '15DTXGAQ1XK5YWKX686ADFGLGKFDINOYLX2DYIZBUZUTZZNF',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '14Xs22PogFVE4nfPmsRFhmnqX3RqdrUANZRaVJU7Hik8DArR',
                display: '14XS22POGFVE4NFPMSRFHMNQX3RQDRUANZRAVJU7HIK8DARR',
              },
              {
                address: '1bYfKv8QUnGm5nSSWpQDPneZkVjU7x3XFyD1bHBMHJJVzqx',
                display: '1BYFKV8QUNGM5NSSWPQDPNEZKVJU7X3XFYD1BHBMHJJVZQX',
              },
              {
                address: '16YA8Y886DHxP3SgpY4Qws6BczY7cfJQQ41gFsPoK3N2YEoL',
                display: 'Jormungand Labs🐍',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '16Ar9KjX2LQf2CdTrTxbyxPjDNswhL7qPhnwcr8ocMynBRWo',
                display: '16AR9KJX2LQF2CDTRTXBYXPJDNSWHL7QPHNWCR8OCMYNBRWO',
              },
              {
                address: '14BRaQT6JV6tCPPH1shiNJ4PF1e1sRet8errHcjNyYeH36wK',
                display: '14BRAQT6JV6TCPPH1SHINJ4PF1E1SRET8ERRHCJNYYEH36WK',
              },
              {
                address: '16cAoz6aW1aYSn6xPx1M8ckyw8PPsQRoVizkB34iypmpxouV',
                display: '16CAOZ6AW1AYSN6XPX1M8CKYW8PPSQROVIZKB34IYPMPXOUV',
              },
              {
                address: '1GnmMYzcZNKdVos8n9E9zCzcB3ZtHxgLneLRiKjR2eAkayj',
                display: '1GNMMYZCZNKDVOS8N9E9ZCZCB3ZTHXGLNELRIKJR2EAKAYJ',
              },
              {
                address: '12R2Xsw9PJwncYpTFhQQX1MRJTcsxWZKE3GATwGgCuHhRqkS',
                display: '12R2XSW9PJWNCYPTFHQQX1MRJTCSXWZKE3GATWGGCUHHRQKS',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '1bvvT4JqyxonjFpoQm7kpohB4bBq26nvmBPKZ1AMNoWzU7t',
                display: '1BVVT4JQYXONJFPOQM7KPOHB4BBQ26NVMBPKZ1AMNOWZU7T',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '12sdWJCE8xTncZMfj2eAhzX3yD3iDyZ5aTU3ciz7GSMWjs4s',
                display: '12SDWJCE8XTNCZMFJ2EAHZX3YD3IDYZ5ATU3CIZ7GSMWJS4S',
              },
              {
                address: '14AoK8VSrHFxZijXhZGSUipHzZbUgo2AkmEaviD9yxTb1ScX',
                display: '14AOK8VSRHFXZIJXHZGSUIPHZZBUGO2AKMEAVID9YXTB1SCX',
              },
              {
                address: '1cFsLn7o74nmjbRyDtMAnMpQMc5ZLsjgCSz9Np2mcejUK83',
                display: 'Uno Staking',
              },
              {
                address: '14BP6oSYP62om8VKh7mScEcZqb472EzanSFJK2E3bwdWGtah',
                display: '14BP6OSYP62OM8VKH7MSCECZQB472EZANSFJK2E3BWDWGTAH',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '149riLdwAVzXg7Cm88RcXhbuFi3zUgwrGsJSSPjC47PRxHQW',
                display: '149RILDWAVZXG7CM88RCXHBUFI3ZUGWRGSJSSPJC47PRXHQW',
              },
              {
                address: '13Xo4xYdMRQQoWD7TA9yCDHG1BXqQFvnjeGvU6LHhRhUsBhQ',
                display: '13XO4XYDMRQQOWD7TA9YCDHG1BXQQFVNJEGVU6LHHRHUSBHQ',
              },
              {
                address: '12iqwZGB2sguEhjFi2ZRuWWixU8mHJnSiP1pwDefqGsBy4rV',
                display: 'dakkk',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '11gqpAyU17G9EFW5n5MNngh824F3Y2as72V2rgc7Wq5JVRd',
                display: '11GQPAYU17G9EFW5N5MNNGH824F3Y2AS72V2RGC7WQ5JVRD',
              },
              {
                address: '16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU',
                display: 'Stampede',
              },
              {
                address: '14gAowz3LaAqYkRjqUZkjZUxKFUzLtN2oZJSfr3ziHBRhwgc',
                display: '14GAOWZ3LAAQYKRJQUZKJZUXKFUZLTN2OZJSFR3ZIHBRHWGC',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '14BeKcfcvJSJjvu9GZ2CA8EQ3XkK9J1HdwDrfz5Sg5ERDnrP',
                display: 'ETHICAL VALIDATORS 0',
              },
              {
                address: '15JobZzEavXuPNHdnJYnQpnTbum3TqvtaftmSuPtzhJiiyqR',
                display: 'Stakin',
              },
              {
                address: '12YqzycfMFoj6H5BYGrq8zBSCEUunVSitqPUuK1xLjpRMzpc',
                display: '12YQZYCFMFOJ6H5BYGRQ8ZBSCEUUNVSITQPUUK1XLJPRMZPC',
              },
              {
                address: '1247Twcyzmb46zNZ68yg3ZBPcsAfKRsxhTa2tkbPBs12gwXt',
                display: 'andreita-validator-0',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '13iTdvQL6Ud7TmwcXpeHSiyi2reB5KKreFa3YCXE8jrCEd6Q',
                display: '13ITDVQL6UD7TMWCXPEHSIYI2REB5KKREFA3YCXE8JRCED6Q',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '16VVNbc4m6aUxwaVwgRra6Ue7fMNGcRQHTFo1TqxmnCyuwwn',
                display: '16VVNBC4M6AUXWAVWGRRA6UE7FMNGCRQHTFO1TQXMNCYUWWN',
              },
              {
                address: '13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR',
                display: '13FV7BTQKR2NQVZSAJAK1DHXKPXGJZE8TWAWNWDK8B1U6VOR',
              },
              {
                address: '13K6QTYBPMUFTbhZzqToKcfCiWbt4wDPHr3rUPyUessiPR61',
                display: 'Genesis Lab',
              },
              {
                address: '1243tzEb446NSpWzPcaeMGpJh2YZ4TwMb4B85yVCt4275fD8',
                display: '1243TZEB446NSPWZPCAEMGPJH2YZ4TWMB4B85YVCT4275FD8',
              },
              {
                address: '16A4n4UQqgxw5ndeehPjUAobDNmuX2bBoPXVKj4xTe16ktRN',
                display: '16A4N4UQQGXW5NDEEHPJUAOBDNMUX2BBOPXVKJ4XTE16KTRN',
              },
              {
                address: '12fW46TcQBwNWhbKdS2vwE4CCHydRtjhiYAXcH6mb6szsRJ6',
                display: '12FW46TCQBWNWHBKDS2VWE4CCHYDRTJHIYAXCH6MB6SZSRJ6',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '13pYWKctR5s8vQuyZt3pxQXue4SRH9coyAS9S9z5HtogAnhs',
                display: 'openbitlab',
              },
            ],
          },
        ],
        runnersUp: [
          {
            account: {
              address: '13Gdmw7xZQVbVoojUCwnW2usEikF2a71y7aocbgZcptUtiX9',
              display: 'ROB',
            },
            backing: '132642803289366647',
            formattedBacking: '13.2642  MDOT',
            voters: [
              {
                address: '1uFscCqjzMDDGRS8bh9W8f4t94WVXgvnzTeSTrdjC8fJZA6',
                display: 'dotberkeley',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '13KoLANqZqUtyfj6hVDzLh3euJZmabuhepT8xG2VrNsF5XjA',
                display: '13KOLANQZQUTYFJ6HVDZLH3EUJZMABUHEPT8XG2VRNSF5XJA',
              },
              {
                address: '13fbwXLxHhueoBP3dStumroAVVDBw88nU5MfMSivPCPBKJ6M',
                display: '13FBWXLXHHUEOBP3DSTUMROAVVDBW88NU5MFMSIVPCPBKJ6M',
              },
              {
                address: '13EEEhiXeCFpFjVQxmjJsHjr9LFvnAurcnwQ1FDgB5LmJwQp',
                display: 'Swiss Bond',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '16iNp8A8EU6naBzvDmJR2i4hgP5EQnZHeGQ6omKeK9C4NTkp',
                display: '16INP8A8EU6NABZVDMJR2I4HGP5EQNZHEGQ6OMKEK9C4NTKP',
              },
              {
                address: '14UpRGUeAfsSZHFN63t4ojJrLNupPApUiLgovXtm7ZiAHUDA',
                display: '14UPRGUEAFSSZHFN63T4OJJRLNUPPAPUILGOVXTM7ZIAHUDA',
              },
              {
                address: '12CJw9KNkC7FzVVg3dvny4PWHjjkvdyM17mmNfXyfucp8JfM',
                display: 'Dionysus🍇',
              },
              {
                address: '13G9QgvXNBhs8CmekiEUFG47E9PPXX2obM7ZbThe6uoD7A7F',
                display: '13G9QGVXNBHS8CMEKIEUFG47E9PPXX2OBM7ZBTHE6UOD7A7F',
              },
              {
                address: '15BMiCvh6cEa7xwCpGmYR4QGsqjZK2FSndjpks6YPT4aC3MK',
                display: 'NewOmegaValidator',
              },
              {
                address: '138NUUJ24QAWgvfZg4DemGiYRhi1ACkVf9htBSb1ymAN7PJW',
                display: '138NUUJ24QAWGVFZG4DEMGIYRHI1ACKVF9HTBSB1YMAN7PJW',
              },
              {
                address: '13ozGG4C5CnB2aQyrdxsf1yf5n4u6252J2Gd9neWk6Zz3psW',
                display: 'ForklessNation',
              },
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2',
                display: '12GPFMRQNSDHC9C5DUXYXBFA23IO5FSGTKTSAIMQTAWGUED2',
              },
              {
                address: '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6',
                display: 'Joe',
              },
              {
                address: '15FZotswrG9r6KQvBPb5Y3ybs6CA5FLbFbyzhk4ABfgDup22',
                display: '15FZOTSWRG9R6KQVBPB5Y3YBS6CA5FLBFBYZHK4ABFGDUP22',
              },
              {
                address: '126RwaHn4MDekLWfUYfiqcVbiQHapwDSAT9vZZS15HLqfDJh',
                display: '126RWAHN4MDEKLWFUYFIQCVBIQHAPWDSAT9VZZS15HLQFDJH',
              },
              {
                address: '14jtNyurHjGCPkvMGnFA4npijraG3qGGtVYSA4vBcZkbU6kP',
                display: '14JTNYURHJGCPKVMGNFA4NPIJRAG3QGGTVYSA4VBCZKBU6KP',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '15dFHJonu6cGqv8UMhrZPpomAtqpGtwnb2Ar7fRCq91BZtVq',
                display: 'ryanhigs',
              },
              {
                address: '1JCU9za8ZwT51LkDHoVXhLRRvBuCeqTTrdkfZsEW6CVyC2L',
                display: '1JCU9ZA8ZWT51LKDHOVXHLRRVBUCEQTTRDKFZSEW6CVYC2L',
              },
              {
                address: '121YHCtd97fn19zttCTVLdC8mjX81ry53X7MpMNsi93JTFHy',
                display: '121YHCTD97FN19ZTTCTVLDC8MJX81RY53X7MPMNSI93JTFHY',
              },
              {
                address: '155woeQGxnm2hPnA6LtCYk8Zr2L7FTnWAkfbLi986JU1AADo',
                display: '155WOEQGXNM2HPNA6LTCYK8ZR2L7FTNWAKFBLI986JU1AADO',
              },
              {
                address: '16V2xWcaVzbd7dbeY91nuZv9L8z9Kj2xp8s34GMxJPDNto2p',
                display: '16V2XWCAVZBD7DBEY91NUZV9L8Z9KJ2XP8S34GMXJPDNTO2P',
              },
              {
                address: '13NRQGknuzoDWWTu7dmAnN4Ehc4roFRMHoSDprKqkNNHdDnF',
                display: '13NRQGKNUZODWWTU7DMANN4EHC4ROFRMHOSDPRKQKNNHDDNF',
              },
              {
                address: '11Q7ismkHUbbUexpQc4DgTvedfsh8jKMDV7jZZoQwv57NLS',
                display: '11Q7ISMKHUBBUEXPQC4DGTVEDFSH8JKMDV7JZZOQWV57NLS',
              },
              {
                address: '16PwWCQsBRTduCFzPt5y6wfHCGxFPFHAKwF97ZQCinGqHLYm',
                display: '16PWWCQSBRTDUCFZPT5Y6WFHCGXFPFHAKWF97ZQCINGQHLYM',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '12yi4uHFbnSUryffXT7Xq92fbGC3iXvCs3vz9HjVgpb4sBvL',
                display: '12YI4UHFBNSURYFFXT7XQ92FBGC3IXVCS3VZ9HJVGPB4SBVL',
              },
              {
                address: '1GVe7pAK2Pc4TVGuPBYbEU82VmaiQhKjFTzECpX7GGXgzBB',
                display: '1GVE7PAK2PC4TVGUPBYBEU82VMAIQHKJFTZECPX7GGXGZBB',
              },
              {
                address: '153Fz22gxQP8HM8RbnvEt9XWsXu9nR8jxZC2MbQFmuKhN62f',
                display: '153FZ22GXQP8HM8RBNVET9XWSXU9NR8JXZC2MBQFMUKHN62F',
              },
              {
                address: '16YwUZyLdeAoe4KmhivGwuuJpBH1US4qkUtXK2V83MVXUy6x',
                display: 'GTSTAKING',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '1y6CPLgccsysCEii3M7jQF834GZsz9A3HMcZz3w7RjGPpBL',
                display: '1Y6CPLGCCSYSCEII3M7JQF834GZSZ9A3HMCZZ3W7RJGPPBL',
              },
              {
                address: '14Xm59iGrpwfBSMQaGdJBQ1krZjvipiL6mGidXY6JKUkJKS8',
                display: '14XM59IGRPWFBSMQAGDJBQ1KRZJVIPIL6MGIDXY6JKUKJKS8',
              },
              {
                address: '12vGYXHLrNhXnvnDU2VL9HxkxVtEr3V3AAYrLfBh5jP5UgFs',
                display: '12VGYXHLRNHXNVNDU2VL9HXKXVTER3V3AAYRLFBH5JP5UGFS',
              },
              {
                address: '14mL52ZDU9cYqgWGGseUbzcxtyvQYRLR8hxcwdVjx3r4nXYf',
                display: '14ML52ZDU9CYQGWGGSEUBZCXTYVQYRLR8HXCWDVJX3R4NXYF',
              },
              {
                address: '13Fv7btqKR2NQVZSaJAK1DhxKpxgjzE8twaWnwDk8B1u6voR',
                display: '13FV7BTQKR2NQVZSAJAK1DHXKPXGJZE8TWAWNWDK8B1U6VOR',
              },
              {
                address: '14mSXQeHpF8NT1tMKu87tAbNDNjm7q9qh8hYa7BY2toNUkTo',
                display: 'Bjorn',
              },
              {
                address: '12gSsEN4aFTp518KJUKHBARjKEREjUhdiWEiN8KuTmgFarrH',
                display: '12GSSEN4AFTP518KJUKHBARJKEREJUHDIWEIN8KUTMGFARRH',
              },
              {
                address: '136GehDWrz4tqL7ivAT53VeS3PweRZDSHyrbnWLdWJpchW8M',
                display: '136GEHDWRZ4TQL7IVAT53VES3PWERZDSHYRBNWLDWJPCHW8M',
              },
            ],
          },
          {
            account: {
              address: '12RYJb5gG4hfoWPK3owEYtmWoko8G6zwYpvDYTyXFVSfJr8Y',
              display: '12RYJB5GG4HFOWPK3OWEYTMWOKO8G6ZWYPVDYTYXFVSFJR8Y',
            },
            backing: '105391371276832210',
            formattedBacking: '10.5391  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '16HvKyV9B61hsop3ZY6pWYeV537S29kd9pb9FMrPzx49ym5X',
                display: 'TheGuild',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '13rfeFLNLU8TfKizGiBLZWaYAwKrAK4JBz5vtU4vK6R427Em',
                display: 'Nodamatics',
              },
              {
                address: '13GtCixw3EZARj52CVbKLrsAzyc7dmmYhDV6quS5yeVCfnh1',
                display: 'RADIUMBLOCK.COM',
              },
              {
                address: '12H9FfSYdQ4GrKc7tdxK8U6DitAZMqfnhB8gtHwd2rpCiZfN',
                display: '12H9FFSYDQ4GRKC7TDXK8U6DITAZMQFNHB8GTHWD2RPCIZFN',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '16YA8Y886DHxP3SgpY4Qws6BczY7cfJQQ41gFsPoK3N2YEoL',
                display: 'Jormungand Labs🐍',
              },
              {
                address: '12CJw9KNkC7FzVVg3dvny4PWHjjkvdyM17mmNfXyfucp8JfM',
                display: 'Dionysus🍇',
              },
              {
                address: '14BRaQT6JV6tCPPH1shiNJ4PF1e1sRet8errHcjNyYeH36wK',
                display: '14BRAQT6JV6TCPPH1SHINJ4PF1E1SRET8ERRHCJNYYEH36WK',
              },
              {
                address: '16cAoz6aW1aYSn6xPx1M8ckyw8PPsQRoVizkB34iypmpxouV',
                display: '16CAOZ6AW1AYSN6XPX1M8CKYW8PPSQROVIZKB34IYPMPXOUV',
              },
              {
                address: '13ozGG4C5CnB2aQyrdxsf1yf5n4u6252J2Gd9neWk6Zz3psW',
                display: 'ForklessNation',
              },
              {
                address: '15psTaipmWG86U5vNkF7Guv9TRPMRLKHkGS8cXT74v3RCC5t',
                display: '🤖 PolkaStats',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '16iiKwFsRKRsjAiEpD4zgNgEX84nzHtHHNFKXhz1sHtan3ne',
                display: 'CryptoLab 01',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '14d2kv44xf9nFnYdms32dYPKQsr5C9urbDzTz7iwU8iHb9az',
                display: 'Coinstudio',
              },
              {
                address: '121NqPL1TNk9pGGdzH19LfeV9W97Qjt3huWUbEncM6yaT18V',
                display: '121NQPL1TNK9PGGDZH19LFEV9W97QJT3HUWUBENCM6YAT18V',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '16GMHo9HZv8CcJy4WLoMaU9qusgzx2wxKDLbXStEBvt5274B',
                display: '16GMHO9HZV8CCJY4WLOMAU9QUSGZX2WXKDLBXSTEBVT5274B',
              },
              {
                address: '12Dw4SzhsxX3fpDiLUYXm9oGbfxcbg1Peq67gc5jkkEo1TKr',
                display: '12DW4SZHSXX3FPDILUYXM9OGBFXCBG1PEQ67GC5JKKEO1TKR',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '15KDFYfFjdqhp3MDFEtHuyu9kLpXbT7k1zjx78MphViFdCaU',
                display: 'redpenguin',
              },
              {
                address: '16ccn3xe5tAeR8kvzCRTcqHZjMJHvuF2pnLfTqyF1EmMusCU',
                display: 'Stampede',
              },
              {
                address: '15ym3MDSG4WPABNoEtx2rAzBB1EYWJDWbWYpNg1BwuWRAQcY',
                display: 'POLKACHU.COM',
              },
              {
                address: '14BeKcfcvJSJjvu9GZ2CA8EQ3XkK9J1HdwDrfz5Sg5ERDnrP',
                display: 'ETHICAL VALIDATORS 0',
              },
              {
                address: '15JobZzEavXuPNHdnJYnQpnTbum3TqvtaftmSuPtzhJiiyqR',
                display: 'Stakin',
              },
              {
                address: '12YqzycfMFoj6H5BYGrq8zBSCEUunVSitqPUuK1xLjpRMzpc',
                display: '12YQZYCFMFOJ6H5BYGRQ8ZBSCEUUNVSITQPUUK1XLJPRMZPC',
              },
              {
                address: '1qSbJPehtSZHe1Y9EX75XqDKn9hcDVArUTwrTy7raQHigzw',
                display: '1QSBJPEHTSZHE1Y9EX75XQDKN9HCDVARUTWRTY7RAQHIGZW',
              },
              {
                address: '16cdSZUq7kxq6mtoVMWmYXo62FnNGT9jzWjVRUg87CpL9pxP',
                display: 'ALESSIO',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '1iz6yoYBzfGuBv7xx9nLSUrvSUySECTAaroQhntUtxmS6LA',
                display: '1IZ6YOYBZFGUBV7XX9NLSURVSUYSECTAAROQHNTUTXMS6LA',
              },
              {
                address: '16zgGRrNMKBfz5CGJgvAmkavER9T8syxVBELqVA8SMLP3gm',
                display: '16ZGGRRNMKBFZ5CGJGVAMKAVER9T8SYXVBELQVA8SMLP3GM',
              },
              {
                address: '1y6CPLgccsysCEii3M7jQF834GZsz9A3HMcZz3w7RjGPpBL',
                display: '1Y6CPLGCCSYSCEII3M7JQF834GZSZ9A3HMCZZ3W7RJGPPBL',
              },
              {
                address: '16VVNbc4m6aUxwaVwgRra6Ue7fMNGcRQHTFo1TqxmnCyuwwn',
                display: '16VVNBC4M6AUXWAVWGRRA6UE7FMNGCRQHTFO1TQXMNCYUWWN',
              },
              {
                address: '13QxC9xuQyP45mAhWCCEnxXYN7eo8pc3Ah6oGaD4MeTUj52v',
                display: '13QXC9XUQYP45MAHWCCENXXYN7EO8PC3AH6OGAD4METUJ52V',
              },
              {
                address: '13Hp4FEF7z7famvakw8cgioHqDxcnhnyQkvd1jF4dxn7cayG',
                display: 'VISIONSTAKE 👁‍🗨',
              },
            ],
          },
          {
            account: {
              address: '128qRiVjxU3TuT37tg7AX99zwqfPtj2t4nDKUv9Dvi5wzxuF',
              display: 'Bruno',
            },
            backing: '104118198645180581',
            formattedBacking: '10.4118  MDOT',
            voters: [
              {
                address: '14N5nJ4oR4Wj36DsBcPLh1JqjvrM2Uf23No2yc2ojjCvSC24',
                display: '14N5NJ4OR4WJ36DSBCPLH1JQJVRM2UF23NO2YC2OJJCVSC24',
              },
              {
                address: '13rfeFLNLU8TfKizGiBLZWaYAwKrAK4JBz5vtU4vK6R427Em',
                display: 'Nodamatics',
              },
              {
                address: '124X3VPduasSodAjS6MPd5nEqM8SUdKN5taMUUPtkWqF1fVf',
                display: 'STAKEPILE',
              },
              {
                address: '12H9FfSYdQ4GrKc7tdxK8U6DitAZMqfnhB8gtHwd2rpCiZfN',
                display: '12H9FFSYDQ4GRKC7TDXK8U6DITAZMQFNHB8GTHWD2RPCIZFN',
              },
              {
                address: '12BkPLskXyXrHhktrinLxVFkPzzvCzCyVCaqHkUEoxMwSzeq',
                display: 'PromoTeam Validator',
              },
              {
                address: '13bptFJSHHLTBDHupxCRR5ErnLSeHFyeUEU5ufNnBL3JeMpG',
                display: '13BPTFJSHHLTBDHUPXCRR5ERNLSEHFYEUEU5UFNNBL3JEMPG',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '15tcHBgQ28uX2kDBHVRnpYgtugQA5vnhHAG6US85XadAr92X',
                display: '15TCHBGQ28UX2KDBHVRNPYGTUGQA5VNHHAG6US85XADAR92X',
              },
              {
                address: '16SSTPeD2UW3hhnuRBS6HjpxhzRFBrRf2Wupxf1iJgMkhBSD',
                display: 'CHAINFLOW',
              },
              {
                address: '15DtxgAQ1XK5ywkx686AdFgLGkFDinoYLx2DyiZBuzUtZZnf',
                display: '15DTXGAQ1XK5YWKX686ADFGLGKFDINOYLX2DYIZBUZUTZZNF',
              },
              {
                address: '1bYfKv8QUnGm5nSSWpQDPneZkVjU7x3XFyD1bHBMHJJVzqx',
                display: '1BYFKV8QUNGM5NSSWPQDPNEZKVJU7X3XFYD1BHBMHJJVZQX',
              },
              {
                address: '1311nP52HPRLCvSS4EXgWfqRfXnjexbr7t82aedpWpGCPnxV',
                display: '1311NP52HPRLCVSS4EXGWFQRFXNJEXBR7T82AEDPWPGCPNXV',
              },
              {
                address: '1UQC7Vs4zbywp8CbxcCCRUyyRqeUZxq9aXeD8UZ3MpLUy12',
                display: 'Gontajones',
              },
              {
                address: '1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8',
                display: '1JA1EH3J8RMB4DR9BRPREXEUASU22DEBFCAKGHO6VAQJDD8',
              },
              {
                address: '1LUckyocmz9YzeQZHVpBvYYRGXb3rnSm2tvfz79h3G3JDgP',
                display: '1LUCKYOCMZ9YZEQZHVPBVYYRGXB3RNSM2TVFZ79H3G3JDGP',
              },
              {
                address: '14BRaQT6JV6tCPPH1shiNJ4PF1e1sRet8errHcjNyYeH36wK',
                display: '14BRAQT6JV6TCPPH1SHINJ4PF1E1SRET8ERRHCJNYYEH36WK',
              },
              {
                address: '15BMiCvh6cEa7xwCpGmYR4QGsqjZK2FSndjpks6YPT4aC3MK',
                display: 'NewOmegaValidator',
              },
              {
                address: '14NGUTHPtUvjbJttSF4qYmX8mUKk75UweWsL3GZyHw4ue2pv',
                display: 'finalbits',
              },
              {
                address: '12R2Xsw9PJwncYpTFhQQX1MRJTcsxWZKE3GATwGgCuHhRqkS',
                display: '12R2XSW9PJWNCYPTFHQQX1MRJTCSXWZKE3GATWGGCUHHRQKS',
              },
              {
                address: '13ozGG4C5CnB2aQyrdxsf1yf5n4u6252J2Gd9neWk6Zz3psW',
                display: 'ForklessNation',
              },
              {
                address: '16iiKwFsRKRsjAiEpD4zgNgEX84nzHtHHNFKXhz1sHtan3ne',
                display: 'CryptoLab 01',
              },
              {
                address: '16g43B7VPfTmpXQujSz3aKbqY9twSrDreHFWtwp4P7bLkQPp',
                display: 'Staking4All 🥩',
              },
              {
                address: '16JCybAA88yQ9t8Cus4YhB5mT5DjyBxBLEgYPCpH8HjnePTq',
                display: '16JCYBAA88YQ9T8CUS4YHB5MT5DJYBXBLEGYPCPH8HJNEPTQ',
              },
              {
                address: '153YD8ZHD9dRh82U419bSCB5SzWhbdAFzjj4NtA5pMazR2yC',
                display: 'SAXEMBERG',
              },
              {
                address: '128iAScPNNZcoSXQuFp1VkgW376KqvZs61g9Y36MuUX78ZZ6',
                display: '🍀ARISTOPHANES🍀',
              },
              {
                address: '15j4dg5GzsL1bw2U2AWgeyAk6QTxq43V7ZPbXdAmbVLjvDCK',
                display: '15J4DG5GZSL1BW2U2AWGEYAK6QTXQ43V7ZPBXDAMBVLJVDCK',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '12Dw4SzhsxX3fpDiLUYXm9oGbfxcbg1Peq67gc5jkkEo1TKr',
                display: '12DW4SZHSXX3FPDILUYXM9OGBFXCBG1PEQ67GC5JKKEO1TKR',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '13ond4N8gejhNeYFxAiCtDymHvgsyQMW3L2kvKMEPtmvi3Cu',
                display: 'ONDIN',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '15KDFYfFjdqhp3MDFEtHuyu9kLpXbT7k1zjx78MphViFdCaU',
                display: 'redpenguin',
              },
              {
                address: '14Q74NU7dG4uxiHTSCSZii5T1Y368cm7BNVNeRWmEuoDUGXQ',
                display: '14Q74NU7DG4UXIHTSCSZII5T1Y368CM7BNVNERWMEUODUGXQ',
              },
              {
                address: '12C6Kfs4hnwYkDvThKjyt7run9htQJ4GWcRTm7xSXqtnox6D',
                display: '12C6KFS4HNWYKDVTHKJYT7RUN9HTQJ4GWCRTM7XSXQTNOX6D',
              },
              {
                address: '12YqzycfMFoj6H5BYGrq8zBSCEUunVSitqPUuK1xLjpRMzpc',
                display: '12YQZYCFMFOJ6H5BYGRQ8ZBSCEUUNVSITQPUUK1XLJPRMZPC',
              },
              {
                address: '16YwUZyLdeAoe4KmhivGwuuJpBH1US4qkUtXK2V83MVXUy6x',
                display: 'GTSTAKING',
              },
              {
                address: '1627VVB5gtHiseCV8ZdffF7P3bWrLMkU92Q6u3LsG8tGuB63',
                display: 'hirish',
              },
              {
                address: '15cfSaBcTxNr8rV59cbhdMNCRagFr3GE6B3zZRsCp4QHHKPu',
                display: '✨👍✨ Day7 ✨👍✨',
              },
              {
                address: '124RsxuvWs31iWyUMvDsnoRUgLQfntxeBXnwWJd8eC7EVe1L',
                display: '124RSXUVWS31IWYUMVDSNORUGLQFNTXEBXNWWJD8EC7EVE1L',
              },
              {
                address: '16DJbUVKFJp6igLoDxCTPesE2DMgMmiawLXG9jsGpYNTshxt',
                display: 'Sio34',
              },
              {
                address: '14TFu7nqzcSnoEN7cSX8JGLtNejb69iSdsbVpt4CA29rXQwo',
                display: '14TFU7NQZCSNOEN7CSX8JGLTNEJB69ISDSBVPT4CA29RXQWO',
              },
              {
                address: '1qWTg2KdN7FD6zUd2Xdv8Fd3WRoTjuBoq4xLxne1p1naBsi',
                display: '1QWTG2KDN7FD6ZUD2XDV8FD3WROTJUBOQ4XLXNE1P1NABSI',
              },
              {
                address: '13Hp4FEF7z7famvakw8cgioHqDxcnhnyQkvd1jF4dxn7cayG',
                display: 'VISIONSTAKE 👁‍🗨',
              },
              {
                address: '1429tQ2RK8xCwiVYYw7YVUFGX2rbASQN2maMExay7x18neoZ',
                display: '1429TQ2RK8XCWIVYYW7YVUFGX2RBASQN2MAMEXAY7X18NEOZ',
              },
              {
                address: '1243tzEb446NSpWzPcaeMGpJh2YZ4TwMb4B85yVCt4275fD8',
                display: '1243TZEB446NSPWZPCAEMGPJH2YZ4TWMB4B85YVCT4275FD8',
              },
              {
                address: '16UvTJteZiHfoGjzMK5fAxwZd3wkbsFb2C1SKsMLCtxRhNWv',
                display: 'Mitch-Wariner',
              },
              {
                address: '13J6LkvsEtdZpvRwUMVNbag26md9ycmGe5PM8UnEokhL6Tgk',
                display: '13J6LKVSETDZPVRWUMVNBAG26MD9YCMGE5PM8UNEOKHL6TGK',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '13pYWKctR5s8vQuyZt3pxQXue4SRH9coyAS9S9z5HtogAnhs',
                display: 'openbitlab',
              },
            ],
          },
          {
            account: {
              address: '16UJBPHVqQ3xYXnmhEpaQtvSRnrP9k1XeE7WxoyCxsrL9AvV',
              display: '16UJBPHVQQ3XYXNMHEPAQTVSRNRP9K1XEE7WXOYCXSRL9AVV',
            },
            backing: '61849980848533363',
            formattedBacking: '6.1849  MDOT',
            voters: [
              {
                address: '14XetcVhGUWtf2W1tbtA6wxP3MwWxTquLsLhZMgKGBG4W7R5',
                display: '14XETCVHGUWTF2W1TBTA6WXP3MWWXTQULSLHZMGKGBG4W7R5',
              },
              {
                address: '12hAtDZJGt4of3m2GqZcUCVAjZPALfvPwvtUTFZPQUbdX1Ud',
                display: 'Shawn Tabrizi',
              },
              {
                address: '14wLHNxVpu12BNAWmerRTNJPLQdVb9r719zfyCX58FLvd9tv',
                display: '14WLHNXVPU12BNAWMERRTNJPLQDVB9R719ZFYCX58FLVD9TV',
              },
              {
                address: '15DiVa5cMJS2UTFmMFdFvfNw9HScDEmKFKsPeri3sEKS5Rh9',
                display: '15DIVA5CMJS2UTFMMFDFVFNW9HSCDEMKFKSPERI3SEKS5RH9',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '121YHCtd97fn19zttCTVLdC8mjX81ry53X7MpMNsi93JTFHy',
                display: '121YHCTD97FN19ZTTCTVLDC8MJX81RY53X7MPMNSI93JTFHY',
              },
              {
                address: '11gqpAyU17G9EFW5n5MNngh824F3Y2as72V2rgc7Wq5JVRd',
                display: '11GQPAYU17G9EFW5N5MNNGH824F3Y2AS72V2RGC7WQ5JVRD',
              },
              {
                address: '13z6tqM18GgaeVD6H9ciwfyQp5dogD58hWJThu5iXKtHfixb',
                display: '13Z6TQM18GGAEVD6H9CIWFYQP5DOGD58HWJTHU5IXKTHFIXB',
              },
              {
                address: '14Xm59iGrpwfBSMQaGdJBQ1krZjvipiL6mGidXY6JKUkJKS8',
                display: '14XM59IGRPWFBSMQAGDJBQ1KRZJVIPIL6MGIDXY6JKUKJKS8',
              },
              {
                address: '13QxC9xuQyP45mAhWCCEnxXYN7eo8pc3Ah6oGaD4MeTUj52v',
                display: '13QXC9XUQYP45MAHWCCENXXYN7EO8PC3AH6OGAD4METUJ52V',
              },
              {
                address: '15iQ2TeSxjNdE5bdTYHrG71p9XQbVQcNCRKHutCUPJVLS7Rn',
                display: '15IQ2TESXJNDE5BDTYHRG71P9XQBVQCNCRKHUTCUPJVLS7RN',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
              {
                address: '136GehDWrz4tqL7ivAT53VeS3PweRZDSHyrbnWLdWJpchW8M',
                display: '136GEHDWRZ4TQL7IVAT53VES3PWERZDSHYRBNWLDWJPCHW8M',
              },
            ],
          },
          {
            account: {
              address: '1WG3jyNqniQMRZGQUc7QD2kVLT8hkRPGMSqAb5XYQM1UDxN',
              display: 'DokiaCapital',
            },
            backing: '53257714439677102',
            formattedBacking: '5.3257  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '12UCSRxm3sCoX6tCkycf5TMgA3xY7Uyp44NjqFEHM6gRbcxL',
                display: '12UCSRXM3SCOX6TCKYCF5TMGA3XY7UYP44NJQFEHM6GRBCXL',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '14sANKW5KWgKiUdpGwwmVpxCnartnCCCx5LLrEvUpGtqo5Cf',
                display: '14SANKW5KWGKIUDPGWWMVPXCNARTNCCCX5LLREVUPGTQO5CF',
              },
              {
                address: '1dvvq2sZg55LfLqFmegU493oUaPWxJfjiYysP1eyovkX6hP',
                display: 'Afr',
              },
            ],
          },
          {
            account: {
              address: '1rwgen2jqJNNg7DpUA4jBvMjyepgiFKLLm3Bwt8pKQYP8Xf',
              display: 'Chevdor',
            },
            backing: '43728290872676003',
            formattedBacking: '4.3728  MDOT',
            voters: [
              {
                address: '1363HWTPzDrzAQ6ChFiMU6mP4b6jmQid2ae55JQcKtZnpLGv',
                display: 'Jaco',
              },
              {
                address: '14fhQS5myHCh3AQZZoELKpQuy2AfNe5am3PzTDvKi7i172n5',
                display: 'Vegas_life',
              },
              {
                address: '13rfeFLNLU8TfKizGiBLZWaYAwKrAK4JBz5vtU4vK6R427Em',
                display: 'Nodamatics',
              },
              {
                address: '14gV6s4whdfezXgnT6tJ79nCKLy2GutDpnEVSMBR9TmDpw5m',
                display: '14GV6S4WHDFEZXGNT6TJ79NCKLY2GUTDPNEVSMBR9TMDPW5M',
              },
              {
                address: '13GtCixw3EZARj52CVbKLrsAzyc7dmmYhDV6quS5yeVCfnh1',
                display: 'RADIUMBLOCK.COM',
              },
              {
                address: '124X3VPduasSodAjS6MPd5nEqM8SUdKN5taMUUPtkWqF1fVf',
                display: 'STAKEPILE',
              },
              {
                address: '16aHHHXnTYAV72qngKmEDVGXwRw8cknqgioY75BsTtMNJEg3',
                display: '16AHHHXNTYAV72QNGKMEDVGXWRW8CKNQGIOY75BSTTMNJEG3',
              },
              {
                address: '15tcHBgQ28uX2kDBHVRnpYgtugQA5vnhHAG6US85XadAr92X',
                display: '15TCHBGQ28UX2KDBHVRNPYGTUGQA5VNHHAG6US85XADAR92X',
              },
              {
                address: '14xQXJdUDC1pzyt8y3z27ANiUBgP7zTSaYutaLELJoyQrdLP',
                display: 'integritee',
              },
              {
                address: '13ogHzWQksuwuw4dv6jph1GHGBxjSP8qzwRJzT69dhnhYEv2',
                display: 'STAKECRAFT',
              },
              {
                address: '1311nP52HPRLCvSS4EXgWfqRfXnjexbr7t82aedpWpGCPnxV',
                display: '1311NP52HPRLCVSS4EXGWFQRFXNJEXBR7T82AEDPWPGCPNXV',
              },
              {
                address: '1jA1Eh3j8RmB4dR9BRPRexEUasu22DEbFCakGHo6VaqjdD8',
                display: '1JA1EH3J8RMB4DR9BRPREXEUASU22DEBFCAKGHO6VAQJDD8',
              },
              {
                address: '16Ar9KjX2LQf2CdTrTxbyxPjDNswhL7qPhnwcr8ocMynBRWo',
                display: '16AR9KJX2LQF2CDTRTXBYXPJDNSWHL7QPHNWCR8OCMYNBRWO',
              },
              {
                address: '14NGUTHPtUvjbJttSF4qYmX8mUKk75UweWsL3GZyHw4ue2pv',
                display: 'finalbits',
              },
              {
                address: '12R2Xsw9PJwncYpTFhQQX1MRJTcsxWZKE3GATwGgCuHhRqkS',
                display: '12R2XSW9PJWNCYPTFHQQX1MRJTCSXWZKE3GATWGGCUHHRQKS',
              },
              {
                address: '13pZskDR7Pt67NtcChSr4uFRBf9ZS52nQeyrceSykq8MDrMe',
                display: '13PZSKDR7PT67NTCCHSR4UFRBF9ZS52NQEYRCESYKQ8MDRME',
              },
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '144ZQGwmJh3VjGXPE1Gfpuy8nrsvmEqLrf9cKjyxREfJXAe',
                display: '144ZQGWMJH3VJGXPE1GFPUY8NRSVMEQLRF9CKJYXREFJXAE',
              },
              {
                address: '15psTaipmWG86U5vNkF7Guv9TRPMRLKHkGS8cXT74v3RCC5t',
                display: '🤖 PolkaStats',
              },
              {
                address: '12gPFmRqnsDhc9C5DuXyXBFA23io5fSGtKTSAimQtAWgueD2',
                display: '12GPFMRQNSDHC9C5DUXYXBFA23IO5FSGTKTSAIMQTAWGUED2',
              },
              {
                address: '12NLgzqfhuJkc9mZ5XUTTG85N8yhhzfptwqF1xVhtK3ZX7f6',
                display: 'Joe',
              },
              {
                address: '13YDWFhtW9AGVcVAqymwgLsCG7uLyFCpiT5jRqRoUG54sSLE',
                display: '13YDWFHTW9AGVCVAQYMWGLSCG7ULYFCPIT5JRQROUG54SSLE',
              },
              {
                address: '16g43B7VPfTmpXQujSz3aKbqY9twSrDreHFWtwp4P7bLkQPp',
                display: 'Staking4All 🥩',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '121NqPL1TNk9pGGdzH19LfeV9W97Qjt3huWUbEncM6yaT18V',
                display: '121NQPL1TNK9PGGDZH19LFEV9W97QJT3HUWUBENCM6YAT18V',
              },
              {
                address: '1cFsLn7o74nmjbRyDtMAnMpQMc5ZLsjgCSz9Np2mcejUK83',
                display: 'Uno Staking',
              },
              {
                address: '153YD8ZHD9dRh82U419bSCB5SzWhbdAFzjj4NtA5pMazR2yC',
                display: 'SAXEMBERG',
              },
              {
                address: '1dGsgLgFez7gt5WjX2FYzNCJtaCjGG6W9dA42d9cHngDYGg',
                display: '1DGSGLGFEZ7GT5WJX2FYZNCJTACJGG6W9DA42D9CHNGDYGG',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '12YFVu7E6v1EYv5XMKRLPg3UrTJAUMw68WxGgFNenRGEiXVJ',
                display: 'We Trust',
              },
              {
                address: '1REAJ1k691g5Eqqg9gL7vvZCBG7FCCZ8zgQkZWd4va5ESih',
                display: 'Polkadot.pro - Realgar',
              },
              {
                address: '16SpacegeUTft9v3ts27CEC3tJaxgvE4uZeCctThFH3Vb24p',
                display: 'Staker Space',
              },
              {
                address: '15KDFYfFjdqhp3MDFEtHuyu9kLpXbT7k1zjx78MphViFdCaU',
                display: 'redpenguin',
              },
              {
                address: '14Q74NU7dG4uxiHTSCSZii5T1Y368cm7BNVNeRWmEuoDUGXQ',
                display: '14Q74NU7DG4UXIHTSCSZII5T1Y368CM7BNVNERWMEUODUGXQ',
              },
              {
                address: '13iacJEHdiTXfxrJ1UPiPAUAv4iXFYdbHbqEDmmdTNhz3h1L',
                display: 'LLoyds.tech',
              },
              {
                address: '14BeKcfcvJSJjvu9GZ2CA8EQ3XkK9J1HdwDrfz5Sg5ERDnrP',
                display: 'ETHICAL VALIDATORS 0',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '15cfSaBcTxNr8rV59cbhdMNCRagFr3GE6B3zZRsCp4QHHKPu',
                display: '✨👍✨ Day7 ✨👍✨',
              },
              {
                address: '14AakQ4jAmr2ytcrhfmaiHMpj5F9cR6wK1jRrdfC3N1oTbUz',
                display: '14AAKQ4JAMR2YTCRHFMAIHMPJ5F9CR6WK1JRRDFC3N1OTBUZ',
              },
              {
                address: '12RXTLiaYh59PokjZVhQvKzcfBEB5CvDnjKKUmDUotzcTH3S',
                display: '12RXTLIAYH59POKJZVHQVKZCFBEB5CVDNJKKUMDUOTZCTH3S',
              },
              {
                address: '15JjaHXBC6whzYhWiEi7uExsTboAC4tibbeBKPxh5CVk5Jfq',
                display: 'Compute Crypto',
              },
              {
                address: '1dvvq2sZg55LfLqFmegU493oUaPWxJfjiYysP1eyovkX6hP',
                display: 'Afr',
              },
              {
                address: '1243tzEb446NSpWzPcaeMGpJh2YZ4TwMb4B85yVCt4275fD8',
                display: '1243TZEB446NSPWZPCAEMGPJH2YZ4TWMB4B85YVCT4275FD8',
              },
              {
                address: '13J6LkvsEtdZpvRwUMVNbag26md9ycmGe5PM8UnEokhL6Tgk',
                display: '13J6LKVSETDZPVRWUMVNBAG26MD9YCMGE5PM8UNEOKHL6TGK',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
            ],
          },
          {
            account: {
              address: '12xGDBh6zSBc3D98Jhw9jgUVsK8jiwGWHaPTK21Pgb7PJyPn',
              display: 'Hypersphere',
            },
            backing: '43275320338512698',
            formattedBacking: '4.3275  MDOT',
            voters: [
              {
                address: '1REEV3CUqiMMfRdeTy9apQwXVabcg2TcQhvsVFtusByZ6ga',
                display: '1REEV3CUQIMMFRDETY9APQWXVABCG2TCQHVSVFTUSBYZ6GA',
              },
              {
                address: '15DiVa5cMJS2UTFmMFdFvfNw9HScDEmKFKsPeri3sEKS5Rh9',
                display: '15DIVA5CMJS2UTFMMFDFVFNW9HSCDEMKFKSPERI3SEKS5RH9',
              },
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '14sANKW5KWgKiUdpGwwmVpxCnartnCCCx5LLrEvUpGtqo5Cf',
                display: '14SANKW5KWGKIUDPGWWMVPXCNARTNCCCX5LLREVUPGTQO5CF',
              },
              {
                address: '155woeQGxnm2hPnA6LtCYk8Zr2L7FTnWAkfbLi986JU1AADo',
                display: '155WOEQGXNM2HPNA6LTCYK8ZR2L7FTNWAKFBLI986JU1AADO',
              },
              {
                address: '15ym3MDSG4WPABNoEtx2rAzBB1EYWJDWbWYpNg1BwuWRAQcY',
                display: 'POLKACHU.COM',
              },
              {
                address: '15iQ2TeSxjNdE5bdTYHrG71p9XQbVQcNCRKHutCUPJVLS7Rn',
                display: '15IQ2TESXJNDE5BDTYHRG71P9XQBVQCNCRKHUTCUPJVLS7RN',
              },
            ],
          },
          {
            account: {
              address: '12mP4sjCfKbDyMRAEyLpkeHeoYtS5USY4x34n9NMwQrcEyoh',
              display: 'polkaworld',
            },
            backing: '31584083045481584',
            formattedBacking: '3.1584  MDOT',
            voters: [
              {
                address: '121BQqP4WxxeyucaLZixRPFWnmvYyhTTvY4iZMHxmUJfUDnZ',
                display: '121BQQP4WXXEYUCALZIXRPFWNMVYYHTTVY4IZMHXMUJFUDNZ',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '14sANKW5KWgKiUdpGwwmVpxCnartnCCCx5LLrEvUpGtqo5Cf',
                display: '14SANKW5KWGKIUDPGWWMVPXCNARTNCCCX5LLREVUPGTQO5CF',
              },
              {
                address: '11gqpAyU17G9EFW5n5MNngh824F3Y2as72V2rgc7Wq5JVRd',
                display: '11GQPAYU17G9EFW5N5MNNGH824F3Y2AS72V2RGC7WQ5JVRD',
              },
              {
                address: '1qSbJPehtSZHe1Y9EX75XqDKn9hcDVArUTwrTy7raQHigzw',
                display: '1QSBJPEHTSZHE1Y9EX75XQDKN9HCDVARUTWRTY7RAQHIGZW',
              },
              {
                address: '155Uc2YERq1vYYcS2owKa3vZk2zyehP624JzX5frkJkPY7db',
                display: 'STAKINGDX_COM',
              },
              {
                address: '14Xm59iGrpwfBSMQaGdJBQ1krZjvipiL6mGidXY6JKUkJKS8',
                display: '14XM59IGRPWFBSMQAGDJBQ1KRZJVIPIL6MGIDXY6JKUKJKS8',
              },
              {
                address: '15iqv4E9F7uX2Xjiyh8uopqEPaP4VTSTvJzX1ccFiwv4G56Y',
                display: '15IQV4E9F7UX2XJIYH8UOPQEPAP4VTSTVJZX1CCFIWV4G56Y',
              },
            ],
          },
          {
            account: {
              address: '14krbTSTJv3aaT1VeBRX7CzoV4crr3adeF3KutdpkCttrxsZ',
              display: '14KRBTSTJV3AAT1VEBRX7CZOV4CRR3ADEF3KUTDPKCTTRXSZ',
            },
            backing: '10971472041814142',
            formattedBacking: '1.0971  MDOT',
            voters: [
              {
                address: '12bSXHhe5qn7TCJms4EUNFUVA4jcPRa9FnJxGZBSJuLKJ9hy',
                display: 'The Badger Lab Validators Co.',
              },
              {
                address: '16YA8Y886DHxP3SgpY4Qws6BczY7cfJQQ41gFsPoK3N2YEoL',
                display: 'Jormungand Labs🐍',
              },
              {
                address: '12R2Xsw9PJwncYpTFhQQX1MRJTcsxWZKE3GATwGgCuHhRqkS',
                display: '12R2XSW9PJWNCYPTFHQQX1MRJTCSXWZKE3GATWGGCUHHRQKS',
              },
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
              {
                address: '14sANKW5KWgKiUdpGwwmVpxCnartnCCCx5LLrEvUpGtqo5Cf',
                display: '14SANKW5KWGKIUDPGWWMVPXCNARTNCCCX5LLREVUPGTQO5CF',
              },
              {
                address: '121NqPL1TNk9pGGdzH19LfeV9W97Qjt3huWUbEncM6yaT18V',
                display: '121NQPL1TNK9PGGDZH19LFEV9W97QJT3HUWUBENCM6YAT18V',
              },
              {
                address: '155woeQGxnm2hPnA6LtCYk8Zr2L7FTnWAkfbLi986JU1AADo',
                display: '155WOEQGXNM2HPNA6LTCYK8ZR2L7FTNWAKFBLI986JU1AADO',
              },
              {
                address: '14Gaex7pUXLpvfE88r9CBcGWYfz19kFaZN8AoeB43F7nc5yE',
                display: '14GAEX7PUXLPVFE88R9CBCGWYFZ19KFAZN8AOEB43F7NC5YE',
              },
              {
                address: '15ym3MDSG4WPABNoEtx2rAzBB1EYWJDWbWYpNg1BwuWRAQcY',
                display: 'POLKACHU.COM',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
              {
                address: '15JobZzEavXuPNHdnJYnQpnTbum3TqvtaftmSuPtzhJiiyqR',
                display: 'Stakin',
              },
              {
                address: '12DmPk8ZU1i7R5mUtk5Hmeb6sTyUMpXVuE8HnZ9nZpP1WNTV',
                display: '12DMPK8ZU1I7R5MUTK5HMEB6STYUMPXVUE8HNZ9NZPP1WNTV',
              },
              {
                address: '1LWcBbCTEc1E1vvVSSPXXiMfGdX9ZLPv9su3cWN3m9xWEjE',
                display: '1LWCBBCTEC1E1VVVSSPXXIMFGDX9ZLPV9SU3CWN3M9XWEJE',
              },
              {
                address: '1mx9gKS9DE4H9dvyxCWKMvuKw8bTDu2cgCcFbKNAhYHwyjD',
                display: 'Sensei',
              },
            ],
          },
          {
            account: {
              address: '15akrup6APpRegG1TtWkYVuWHYc37tJ8XPN61vCuHQUi65Mx',
              display: 'akru',
            },
            backing: '10500726156375339',
            formattedBacking: '1.0500  MDOT',
            voters: [
              {
                address: '12BkPLskXyXrHhktrinLxVFkPzzvCzCyVCaqHkUEoxMwSzeq',
                display: 'PromoTeam Validator',
              },
              {
                address: '16SSTPeD2UW3hhnuRBS6HjpxhzRFBrRf2Wupxf1iJgMkhBSD',
                display: 'CHAINFLOW',
              },
              {
                address: '12R2Xsw9PJwncYpTFhQQX1MRJTcsxWZKE3GATwGgCuHhRqkS',
                display: '12R2XSW9PJWNCYPTFHQQX1MRJTCSXWZKE3GATWGGCUHHRQKS',
              },
              {
                address: '11AnciffJctDC28odTEjDVYP2yWyp6275WLbrAUHi2vJm9f',
                display: 'AncibanciDOT',
              },
              {
                address: '16PVNBGgWd6PzkzERZcjqWdXnKYBX6YSWNKY7svMYzG5XuEo',
                display: '🃏 Shad',
              },
              {
                address: '14Q74NU7dG4uxiHTSCSZii5T1Y368cm7BNVNeRWmEuoDUGXQ',
                display: '14Q74NU7DG4UXIHTSCSZII5T1Y368CM7BNVNERWMEUODUGXQ',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
            ],
          },
          {
            account: {
              address: '16PVNBGgWd6PzkzERZcjqWdXnKYBX6YSWNKY7svMYzG5XuEo',
              display: '🃏 Shad',
            },
            backing: '1102937349685828',
            formattedBacking: '110,293.7349 DOT',
            voters: [
              {
                address: '12BkPLskXyXrHhktrinLxVFkPzzvCzCyVCaqHkUEoxMwSzeq',
                display: 'PromoTeam Validator',
              },
              {
                address: '16PVNBGgWd6PzkzERZcjqWdXnKYBX6YSWNKY7svMYzG5XuEo',
                display: '🃏 Shad',
              },
              {
                address: '16GDRhRYxk42paoK6TfHAqWej8PdDDUwdDazjv4bAn4KGNeb',
                display: 'CP287-CLOUDWALK',
              },
              {
                address: '131Y21vAVYxm7f5xtaV3NydJRpig3CqyvjTyFM8gMpRbFH1T',
                display: 'NeNa 🌻',
              },
            ],
          },
          {
            account: {
              address: '13pdp6ALhYkfEBqBM98ztL2Xhv4MTkm9rZ9vyjyXSdirJHx6',
              display: '13PDP6ALHYKFEBQBM98ZTL2XHV4MTKM9RZ9VYJYXSDIRJHX6',
            },
            backing: '1066080809236940',
            formattedBacking: '106,608.0809 DOT',
            voters: [
              {
                address: '14sANKW5KWgKiUdpGwwmVpxCnartnCCCx5LLrEvUpGtqo5Cf',
                display: '14SANKW5KWGKIUDPGWWMVPXCNARTNCCCX5LLREVUPGTQO5CF',
              },
              {
                address: '13QxC9xuQyP45mAhWCCEnxXYN7eo8pc3Ah6oGaD4MeTUj52v',
                display: '13QXC9XUQYP45MAHWCCENXXYN7EO8PC3AH6OGAD4METUJ52V',
              },
            ],
          },
          {
            account: {
              address: '12EhrWGTAEEjETcQhwvus22bYMoDC7iDsnyroD2gSdM9EsK7',
              display: 'Hanwen',
            },
            backing: '402622731885113',
            formattedBacking: '40,262.2731 DOT',
            voters: [
              {
                address: '16SvYd621U6nik8kBSfpkso5P5fbVZozwoKwggqAd6hQ6MuT',
                display: '16SVYD621U6NIK8KBSFPKSO5P5FBVZOZWOKWGGQAD6HQ6MUT',
              },
              {
                address: '167rjWHghVwBJ52mz8sNkqr5bKu5vpchbc9CBoieBhVX714h',
                display: 'QinWen',
              },
              {
                address: '1gn7eoheUsotsLGvJMakSZLBNAih3bCscJhBucezSE44pt8',
                display: '1GN7EOHEUSOTSLGVJMAKSZLBNAIH3BCSCJHBUCEZSE44PT8',
              },
              {
                address: '15cfSaBcTxNr8rV59cbhdMNCRagFr3GE6B3zZRsCp4QHHKPu',
                display: '✨👍✨ Day7 ✨👍✨',
              },
              {
                address: '15wXcfFCshEuNF7B9n2T1Gh66buE6BN5tsbMLgfcRAcJcoWE',
                display: '15WXCFFCSHEUNF7B9N2T1GH66BUE6BN5TSBMLGFCRACJCOWE',
              },
              {
                address: '12EhrWGTAEEjETcQhwvus22bYMoDC7iDsnyroD2gSdM9EsK7',
                display: 'Hanwen',
              },
              {
                address: '15Lq1yb5KngrqU987x3v75ZCtPLaP59oEnTAgwMgh7sTB522',
                display: '15LQ1YB5KNGRQU987X3V75ZCTPLAP59OENTAGWMGH7STB522',
              },
              {
                address: '152vvyzFJn9pqM2mLiiJhmZXWxaAxmPx7fycwJUrETB1g72G',
                display: '152VVYZFJN9PQM2MLIIJHMZXWXAAXMPX7FYCWJURETB1G72G',
              },
            ],
          },
          {
            account: {
              address: '14AgaKr2jYURm74azd4QKEXrDC4ZLg7nq7iae11dS7341QQq',
              display: 'DAN REECER',
            },
            backing: '296809328651583',
            formattedBacking: '29,680.9328 DOT',
            voters: [
              {
                address: '15PeEsbJeU2BZDgoCmo6xdzsuRaZv1PxLaCUyFmfWPwkZPJ4',
                display: '15PEESBJEU2BZDGOCMO6XDZSURAZV1PXLACUYFMFWPWKZPJ4',
              },
              {
                address: '14K6CfR5NsTg1SZQVKpCVvwXS1bz1Bx1DpG98fYCcqo4gpaQ',
                display: '14K6CFR5NSTG1SZQVKPCVVWXS1BZ1BX1DPG98FYCCQO4GPAQ',
              },
              {
                address: '13ogHzWQksuwuw4dv6jph1GHGBxjSP8qzwRJzT69dhnhYEv2',
                display: 'STAKECRAFT',
              },
              {
                address: '14AgaKr2jYURm74azd4QKEXrDC4ZLg7nq7iae11dS7341QQq',
                display: 'DAN REECER',
              },
              {
                address: '1HrrtSvwq5zekZNHSjsARu35sfo24wJnm8o6gQZt4CUnKmU',
                display: 'JJB',
              },
              {
                address: '14BRaQT6JV6tCPPH1shiNJ4PF1e1sRet8errHcjNyYeH36wK',
                display: '14BRAQT6JV6TCPPH1SHINJ4PF1E1SRET8ERRHCJNYYEH36WK',
              },
              {
                address: '153YD8ZHD9dRh82U419bSCB5SzWhbdAFzjj4NtA5pMazR2yC',
                display: 'SAXEMBERG',
              },
              {
                address: '1dGsgLgFez7gt5WjX2FYzNCJtaCjGG6W9dA42d9cHngDYGg',
                display: '1DGSGLGFEZ7GT5WJX2FYZNCJTACJGG6W9DA42D9CHNGDYGG',
              },
              {
                address: '15wepZh1jWNqxBjsgErm8HmYiE21n79c5krQJeTsYAjHddeM',
                display: 'Sik | crifferent.de',
              },
              {
                address: '13kz33kotYa3M75u5avMS367zJY3Fx2y5ZYASEPunqfEeCjD',
                display: 'WOJDOT   ʕ •ᴥ•ʔ',
              },
              {
                address: '15cfSaBcTxNr8rV59cbhdMNCRagFr3GE6B3zZRsCp4QHHKPu',
                display: '✨👍✨ Day7 ✨👍✨',
              },
            ],
          },
          {
            account: {
              address: '14Y4s6V1PWrwBLvxW47gcYgZCGTYekmmzvFsK1kiqNH2d84t',
              display: 'RockX_Polkadot',
            },
            backing: '168675727022255',
            formattedBacking: '16,867.5727 DOT',
            voters: [
              {
                address: '12BkPLskXyXrHhktrinLxVFkPzzvCzCyVCaqHkUEoxMwSzeq',
                display: 'PromoTeam Validator',
              },
              {
                address: '1v9EmBEzBLD8rQREUyqHmgNyi7jaaW1Ex3BEFTdn2BppYBR',
                display: '1V9EMBEZBLD8RQREUYQHMGNYI7JAAW1EX3BEFTDN2BPPYBR',
              },
              {
                address: '1311nP52HPRLCvSS4EXgWfqRfXnjexbr7t82aedpWpGCPnxV',
                display: '1311NP52HPRLCVSS4EXGWFQRFXNJEXBR7T82AEDPWPGCPNXV',
              },
              {
                address: '15XWwj8dfkasUKQqDpw1DC8nk193C9qTCzKCSVASKfoPNb2u',
                display: '15XWWJ8DFKASUKQQDPW1DC8NK193C9QTCZKCSVASKFOPNB2U',
              },
              {
                address: '1gn7eoheUsotsLGvJMakSZLBNAih3bCscJhBucezSE44pt8',
                display: '1GN7EOHEUSOTSLGVJMAKSZLBNAIH3BCSCJHBUCEZSE44PT8',
              },
            ],
          },
          {
            account: {
              address: '15BQUqtqhmqJPyvvEH5GYyWffXWKuAgoSUHuG1UeNdb8oDNT',
              display: 'HashQuark',
            },
            backing: '129920976719186',
            formattedBacking: '12,992.0976 DOT',
            voters: [
              {
                address: '14sANKW5KWgKiUdpGwwmVpxCnartnCCCx5LLrEvUpGtqo5Cf',
                display: '14SANKW5KWGKIUDPGWWMVPXCNARTNCCCX5LLREVUPGTQO5CF',
              },
              {
                address: '153YD8ZHD9dRh82U419bSCB5SzWhbdAFzjj4NtA5pMazR2yC',
                display: 'SAXEMBERG',
              },
            ],
          },
          {
            account: {
              address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
              display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
            },
            backing: '2499652617751',
            formattedBacking: '249.9652 DOT',
            voters: [
              {
                address: '1zugcapYNZWiec8B2q4H5YdsTkspujXiHi1jrBVrCtNTqDa',
                display: '1ZUGCAPYNZWIEC8B2Q4H5YDSTKSPUJXIHI1JRBVRCTNTQDA',
              },
            ],
          },
        ],
        candidates: [],
        totalCandidates: 0,
        primeMember: {
          account: {
            address: '13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2',
            display: '🍺 Gav 🥃/🏛 Council 🏛',
          },
          backing: '137575256885404963',
          formattedBacking: '13.7575  MDOT',
          voters: [],
        },
        desiredSeats: 13,
        totalMembers: 13,
        desiredRunnersUp: 20,
        totalRunnersUp: 17,
        termProgress: {
          termDuration: '7 days',
          termDurationParts: ['7 days'],
          termLeft: '2 days 18 hrs',
          termLeftParts: ['2 days', '18 hrs', '44 mins', '54 s'],
          percentage: 60,
        },
      },
    }),
  );
});
