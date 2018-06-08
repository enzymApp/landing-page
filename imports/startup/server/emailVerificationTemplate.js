export default {
  subject: () => `Enzym - confirmation de ton Mail`,
  text: (user, code, getUrlFromCode) => `
salut !

merci pour ta confiance, il ne te reste plus qu’à cliquer sur le lien suivant, pour confirmer ton appartenance à la communauté Enzym - real life social gaming.

Tu pourras ensuite ajouter un pseudo si tu souhaites participer au concours de parrainage !

${getUrlFromCode(code)}

Pour te récompenser et dès que nous serons en possession de nos Tokens ZYMs (fin juin 2018), qui est le carburant de votre future application, nous serons ravis de t’en offrir 1. Nous te contacterons à ce moment là pour t’indiquer la procédure à suivre.

Si comme nous, tu crois en un réseau social décentralisé autour d’un jeu, n’oublies pas de partager le lien qui apparaîtra, ce qui te permettra de monter dans le classement du concours de parrainage et de gagner 1 token pour chaque parrainage réussi.

Le classement est le premier critère pour devenir ambassadeur de Enzym.

Si tu as des questions, n’hésites pas à nous contacter via le Chat en bas à droite.


Sincèrement,

L’équipe d’Enzym !
`
}
