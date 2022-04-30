import { GiSquid } from "react-icons/gi"
import Layout from "../src/components/Layout"

const LegalNoticePage = () => {
  return (
    <Layout
      page="Mentions légales"
      diplayheader={1}
      diplaybreadcrumbs={1}
      diplayfooter={1}
    >
      <div className="pb-10">
        <div>
          <h2 className="font-bold text-xl">
            Politique de confidentialité de Squid marketPlace{" "}
          </h2>
          <p className="my-5 text-justify">
            La présente Politique de confidentialité décrit la façon dont vos
            informations personnelles sont recueillies, utilisées et partagées
            lorsque vous vous rendez sur Squid MarketPlace ou que vous y
            effectuez un achat.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> INFORMATIONS PERSONNELLES
            RECUEILLIES
          </h3>
          <p className="my-5 text-justify">
            Lorsque vous vous rendez sur le Site, nous recueillons
            automatiquement certaines informations concernant votre appareil,
            notamment des informations sur votre navigateur web, votre adresse
            IP, votre sexe, vos mensurations votre fuseau horaire et certains
            des cookies qui sont installés sur votre appareil. En outre, lorsque
            vous parcourez le Site, nous recueillons des informations sur les
            pages web ou produits individuels que vous consultez, les sites web
            ou les termes de recherche qui vous ont permis d'arriver sur le
            Site, ainsi que des informations sur la manière dont vous
            interagissez avec le Site. Nous désignons ces informations
            collectées automatiquement sous l'appellation « Informations sur
            l'appareil ».
          </p>
          <p className="my-5 text-justify">
            Nous recueillons les Informations sur l'appareil à l'aide des
            technologies suivantes :
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> FICHIERS TÉMOINS (COOKIES)
          </h3>
          <p className="my-5 text-justify">
            Voici une liste de fichiers témoins que nous utilisons. Nous les
            avons énumérés ici pour que vous ayez la possibilité de choisir si
            vous souhaitez les autoriser ou non.
          </p>
          <ul className="ml-10 list-disc">
            <li className="mt-1">
              _session_id, identificateur unique de session, permet à Squid de
              stocker les informations relatives à votre session (référent, page
              de renvoi, etc.).
            </li>
            <li className="mt-1">
              _shop_visit, aucune donnée retenue, persiste pendant 30 minutes
              depuis la dernière visite. Utilisé par le système interne de suivi
              des statistiques du fournisseur de notre site web pour enregistrer
              le nombre de visites.
            </li>
            <li className="mt-1">
              _shop_uniq, aucune donnée retenue, expire à minuit (selon
              l’emplacement du visiteur) le jour suivant. Calcule le nombre de
              visites d’une boutique par client unique.
            </li>
            <li className="mt-1">
              cart, identificateur unique, persiste pendant 2 semaines, stocke
              l’information relative à votre panier d’achat.
            </li>
            <li className="mt-1">
              _secure_session_id, identificateur unique de session
            </li>
            <li className="mt-1">
              storefront_digest, identificateur unique, indéfini si la boutique
              possède un mot de passe, il est utilisé pour savoir si le visiteur
              actuel a accès. - Les « fichiers journaux » suivent l'activité du
              Site et recueillent des données telles que votre adresse IP, le
              type de navigateur que vous utilisez, votre fournisseur d'accès
              Internet, vos pages référentes et de sortie, et vos données
              d'horodatage (date et heure). - Les « pixels invisibles », les «
              balises » et les « pixels » sont des fichiers électroniques qui
              enregistrent des informations sur la façon dont vous parcourez le
              Site.
            </li>
          </ul>
          <p className="my-5 text-justify">
            Par ailleurs, lorsque vous effectuez ou tentez d'effectuer un achat
            par le biais du Site, nous recueillons certaines informations vous
            concernant, notamment votre nom, votre adresse de facturation, votre
            adresse d'expédition, vos informations de paiement (y compris vos
            numéros de cartes de crédit, votre adresse e-mail et votre numéro de
            téléphone. Ces informations collectées automatiquement sont
            désignées par l’appellation « Informations sur la commande ».
          </p>
          <p className="my-5 text-justify">
            Lorsque nous utilisons l'expression « Informations personnelles »
            dans la présente Politique de confidentialité, nous faisons allusion
            à la fois aux Informations sur l'appareil et aux Informations sur la
            commande.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> COMMENT UTILISONS-NOUS VOS
            INFORMATIONS PERSONNELLES ?
          </h3>
          <p className="my-5 text-justify">
            En règle générale, nous utilisons les Informations sur la commande
            que nous recueillons pour traiter toute commande passée par le biais
            du Site (y compris pour traiter vos informations de paiement,
            organiser l'expédition de votre commande et vous fournir des
            factures et/ou des confirmations de commande). En outre, nous
            utilisons ces Informations sur la commande pour :
          </p>
          <ul className="ml-10 list-disc">
            <li className="mt-1">communiquer avec vous ;</li>
            <li className="mt-1">
              évaluer les fraudes ou risques potentiels ;
            </li>
            <li className="mt-1">
              et lorsque cela correspond aux préférences que vous nous avez
              communiquées, vous fournir des informations ou des publicités
              concernant nos produits ou services.
            </li>
          </ul>
          <p className="my-5 text-justify">
            Nous utilisons les Informations sur l'appareil (en particulier votre
            adresse IP) que nous recueillons pour évaluer les fraudes ou risques
            potentiels et, de manière plus générale, pour améliorer et optimiser
            notre Site (par exemple, en générant des analyses sur la façon dont
            nos clients parcourent et interagissent avec le Site, et pour
            évaluer la réussite de nos campagnes de publicité et de marketing).
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> PARTAGE DE VOS INFORMATIONS
            PERSONNELLES
          </h3>
          <p className="my-5 text-justify">
            Nous utilisons Google Analytics pour mieux comprendre comment nos
            clients utilisent le Site – pour en savoir plus sur l'utilisation de
            vos Informations personnelles par Google, veuillez consulter la page
            suivante : <br />
            <a
              className="text-secondary font-bold hover:underline"
              href="https://www.google.com/intl/fr/policies/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.google.com/intl/fr/policies/privacy/
            </a>
          </p>
          <p className="my-5 text-justify">
            Vous pouvez aussi désactiver Google Analytics ici :{" "}
            <a
              className="text-secondary font-bold hover:underline"
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://tools.google.com/dlpage/gaoptout
            </a>
          </p>
          <p className="my-5 text-justify">
            Enfin, il se peut que nous partagions aussi vos Informations
            personnelles pour respecter les lois et règlementations applicables,
            répondre à une assignation, à un mandat de perquisition ou à toute
            autre demande légale de renseignements que nous recevons, ou pour
            protéger nos droits.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> PUBLICITÉ COMPORTEMENTALE
          </h3>
          <p className="my-5 text-justify">
            Comme indiqué ci-dessus, nous utilisons vos Informations
            personnelles pour vous proposer des publicités ciblées ou des
            messages de marketing qui, selon nous, pourraient vous intéresser.
            Pour en savoir plus sur le fonctionnement de la publicité ciblée,
            vous pouvez consulter la page d'information de la Network
            Advertising Initiative (NAI) à l'adresse suivante : <br />
            <a
              className="text-secondary font-bold hover:underline"
              href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work"
              target="_blank"
              rel="noopener noreferrer"
            >
              http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
            </a>
          </p>
          <p className="my-5 text-justify">
            Vous pouvez refuser la publicité ciblée ici :
          </p>
          <ul className="ml-10 list-disc">
            <li className="mt-1">
              FACEBOOK –{" "}
              <a
                className="text-secondary font-bold hover:underline"
                href="https://www.facebook.com/settings/?tab=ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.facebook.com/settings/?tab=ads
              </a>
            </li>
            <li className="mt-1">
              GOOGLE –{" "}
              <a
                className="text-secondary font-bold hover:underline"
                href="https://www.google.com/settings/ads/anonymous"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.google.com/settings/ads/anonymous
              </a>
            </li>
            <li className="mt-1">
              BING –{" "}
              <a
                className="text-secondary font-bold hover:underline"
                href="https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-personnalisees
              </a>
            </li>
          </ul>
          <p className="my-5 text-justify">
            En outre, vous pouvez refuser certains de ces services en vous
            rendant sur le portail de désactivation de Digital Advertising
            Alliance à l'adresse suivante : <br />
            <a
              className="text-secondary font-bold hover:underline"
              href="https://optout.aboutads.info/?c=3&lang=fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://optout.aboutads.info/?c=3&lang=fr
            </a>
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> NE PAS SUIVRE
          </h3>
          <p className="my-5 text-justify">
            Veuillez noter que nous ne modifions pas la collecte de données de
            notre Site et nos pratiques d'utilisation lorsque nous détectons un
            signal « Ne pas suivre » sur votre navigateur.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> VOS DROITS
          </h3>
          <p className="my-5 text-justify">
            Si vous êtes résident(e) européen(ne), vous disposez d'un droit
            d'accès aux informations personnelles que nous détenons à votre
            sujet et vous pouvez demander à ce qu'elles soient corrigées, mises
            à jour ou supprimées. Si vous souhaitez exercer ce droit, veuillez
            nous contacter au moyen des coordonnées précisées ci-dessous.
          </p>
          <p className="my-5 text-justify">
            Par ailleurs, si vous êtes résident(e) européen(ne), notez que nous
            traitons vos informations dans le but de remplir nos obligations
            contractuelles à votre égard (par exemple si vous passez une
            commande sur le Site) ou de poursuivre nos intérêts commerciaux
            légitimes, énumérés ci-dessus. Veuillez également noter que vos
            informations seront transférées hors de l'Europe, y compris au
            Canada et aux États-Unis.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> RÉTENTION DES DONNÉES
          </h3>
          <p className="my-5 text-justify">
            Lorsque vous passez une commande par l'intermédiaire du Site, nous
            conservons les Informations sur votre commande dans nos dossiers,
            sauf si et jusqu'à ce que vous nous demandiez de les supprimer.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> MINEURS
          </h3>
          <p className="my-5 text-justify">
            Le Site n'est pas destiné aux individus de moins de 3ans.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> CHANGEMENTS
          </h3>
          <p className="my-5 text-justify">
            Nous pouvons être amenés à modifier la présente politique de
            confidentialité de temps à autre afin d'y refléter, par exemple, les
            changements apportés à nos pratiques ou pour d'autres motifs
            opérationnels, juridiques ou réglementaires.
          </p>
          <h3 className="flex items-center justify-start">
            <GiSquid className="mr-2 text-lg" /> NOUS CONTACTER
          </h3>
          <p className="my-5 text-justify">
            Pour en savoir plus sur nos pratiques de confidentialité, si vous
            avez des questions ou si vous souhaitez déposer une réclamation,
            veuillez nous contacter par e-mail à tentaclus@squidmarket.com, ou
            par courrier à l'adresse suivante :
          </p>
          <p className="my-5 text-justify">
            {" "}
            12 Av. Léonard de Vinci, Courbevoie, 92400, France
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default LegalNoticePage
