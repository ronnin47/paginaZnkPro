-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-05-2024 a las 21:44:23
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `znk`
--
CREATE DATABASE IF NOT EXISTS `znk` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `znk`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dominios`
--
-- Creación: 19-03-2024 a las 18:10:52
--

CREATE TABLE `dominios` (
  `idDominio` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `dominios`
--

INSERT INTO `dominios` (`idDominio`, `nombre`, `descripcion`) VALUES
(1, 'Guerrero de las artes marciales', 'Este dominio es caracterizado por sorprendentes guerreros entrenados en el combate marcial a puño limpio, luchadores de un explosivo espíritu de batalla, de gran coraje e increíbles capacidades físicas sobrehumanas. Estos personajes constantemente buscarán bajo el camino de sus artes marciales superar sus capacidades, siempre desafiando a aquellos oponentes con los que puedan explotar al máximo su habilidad de combate, así como también no dudarán en luchar contra las peligrosas bestias del mundo salvaje que se presenten en sus aventuras.\r\n\r\nGeneralmente el estilo de vida de estos personajes suele ser errante y libre, surgiendo comúnmente de las clases bajas de los reinos, pudiendo pertenecer a algún dojo prestigioso o habiendo sido entrenados por algún maestro ermitaño. No suelen ser atraídos por los títulos o los conflictos políticos del reino, sus motivaciones suelen estar siempre enfocadas en el duro camino del guerrero.\r\n\r\nEste dominio es practicante del antiguo arte de la fuerza vital conocido como Jinken, desarrollado por los seres más fuertes que el universo haya visto. Bajo sus técnicas estos guerreros podrán mantener batallas aéreas volando por los cielos, potenciarán sorprendentemente su fortaleza ante ataques letales que ningún humano podría soportar, serán capaces de disparar desde la palma de su mano potentes descargas de energía, y alcanzando su grado máximo de técnica superior desataran la furia de su ki de batalla incrementando enormemente sus energías para la lucha.\r\n\r\nEstos temerarios personajes serán quienes se enfrentarán cara a cara en batalla contra los peligros que se presenten, así historia tras historia se convertirán en poderosos guerreros estoicos de las sagas del universo celeste.'),
(2, 'Maestro de armas', 'Este dominio es caracterizado por guerreros excepcionales en el manejo de sus armas, las cuales representan su genuino espíritu de batalla contra toda adversidad. Su armamento y estilo de lucha estarán íntimamente relacionados a sus verdaderos propósitos y manera de comprender el mundo que los rodea, siendo propio de un shinobi el estilo furtivo de kunais  o para un guerrero samurai enfocado en el kenjutsu, la noble hoja de su katana. Estos personajes suelen enfocar sus disciplinados entrenamientos sobre el estilo de un armamento específico, logrando así en este un nivel de maestría insuperable, que combinado con su destreza y la potencia de su arma, los definirán como letales adversarios.\r\n\r\nMuchos importantes clanes samurai y demás casas prestigiosas de los reinos representan en la era el legado de este dominio, blandiendo legendarios armamentos de antiguos tiempos en nombre de su señor o de sus ideales. Pero también existen tenaces guerreros que bajo su propios principios y estilo en este dominio, vagan por los mundos buscando convertirse en nuevas leyendas, consagrando así la reputación de su propio estilo y el legítimo renombre de su arma única, a través de las eras.\r\n\r\nEl Bujutsu, antiguo arte de armas, enfoca sus técnicas en la unión ideal del guerrero y su leal arma única, despertando la voluntad de esta bajo un nombre que le dará vida. Sus técnicas de combate le permitirán atacar con poderosas ondas cortantes a oponentes a grandes distancias, intensificar el filo y generar cortes de energía causando letales ataques a sus adversarios. En su grado de maestría más alto, bajo una transformación se liberará la verdadera forma de combate de su armamento único, que con su extraordinario filo servirá a la voluntad de su maestro.\r\n\r\nEstos personajes acompañados por la presencia de sus armamentos únicos y su insuperable habilidad en el combate, definirán a través de la batalla su protagonismo en el curso de las sagas. '),
(3, 'Maestro de las sombras', 'Este dominio está caracterizado por espías expertos, maestros ladrones, sicarios y clanes shinobi de diferentes aldeas secretas, personajes de gran astucia que buscarán cumplir sus objetivos desde el anonimato. Estos suelen moverse en sus cometidos con extrema cautela, siempre siendo los más analiticos al momento de decidir sus movimientos. Un maestro de las sombras siempre buscará anticiparse a los acontecimientos, midiendo tanto a sus adversarios como a sus propios aliados, calculando siempre las probabilidades ante las situaciones adversas que se presenten, utilizando la información y planificando la mejor estrategia con el fin de alcanzar sus objetivos. \r\n\r\nEste dominio es propio de los antiguos clanes ninja, quienes en sus tradiciones veneran el llamado “manto de las sombras”, la verdadera fuerza de la unión shinobi para mantener desde el anonimato y la secrecía, el orden y la justicia en sus tierras. Pero también existen maestros de las sombras que enfocan sus talentos para sus propios intereses, tales como sicarios a sueldo, espías de la yakuza o ladrones y saqueadores de tesoros, estos personajes bajo sus propios principios utilizaran sus habilidades en este dominio para actuar con eficacia en sus cometidos.\r\n\r\nEl antiguo Kageboshi o arte de las sombras, concentra su magia en diferentes técnicas ilusorias, dotando a su usuario de una presencia capaz de manipular con subterfugios hasta a los más incrédulos, acechar a sus objetivos mimetizándose con el ambiente, ocultar su identidad bajo diferentes formas y manifestar clones ilusorios de sí mismo los cuales le permitirán amplificar sus percepciones en diferentes escenarios. \r\n\r\nUn maestro de las sombras será un personaje inquietante, lleno de secretos y estrategias, quien seguramente manipulará el curso de las situaciones, abriendo su camino en el curso de las sagas como un misterioso protagonista.'),
(4, 'Criador Bakemono', 'Este dominio es caracterizado por los criadores de bestias bakemono, maestros de los monstruos mágicos que habitan en todo tipo de escenarios del extenso universo celeste. Estos personajes son conocedores de las diferentes especies y sus particulares características, así como también de los peligros del mundo salvaje donde estas criaturas dominan. Los criadores bakemono mediante su presencia empática con las bestias, establecen un vínculo capaz de lograr que hasta la bestia más agresiva se les una como un leal aliado. Este estilo de personaje es el más apto para adentrarse en las peligrosas aventuras en tierras indómitas, o enfrentar a los temibles Kaiju, monstruos malignos de una sanguinaria conducta destructiva que constantemente invaden los reinos.\r\n\r\nEl estilo de vida bajo este dominio es propio de ermitaños que protegen la armonía de zonas naturales, valientes cazadores Kaiju, aventureros de cofradías, cazatesoros errantes y hasta temerarios guerreros vinculados a feroces bestias salvajes. Siempre acompañado por sus leales bestias, un criador buscará evolucionar las capacidades de las mismas, así como también sumar nuevos compañeros para que se unan a sus extraordinarias aventuras, de esta manera juntos recorrerán todo tipo de territorios inhóspitos.\r\n\r\nEl Zoshoku, antiguo arte de bestias, concentra sus técnicas en la unión del criador y sus bakemonos. Bajo las habilidades de este arte un criador podrá comprender el lenguaje de las bestias, comunicándose mutuamente con bakemonos y animales a la perfección, lograra curar lesiones producidas por bakemonos, asi como tambien podrá focalizar su kI manifestando un campo de protección sobre su cuerpo, que le permitirá soportar los letales ataques de los temibles Kaiju. En su grado de técnica máxima, un criador de bestias podrá invocar los sorprendentes poderes de sus bakemonos aliados, utilizándolos como si fueran propios, manifestando desde el las fuerzas del mundo salvaje.\r\n\r\nUn criador bakemono será un protagonista que conectado a las fuerzas de la naturaleza, junto a sus bestias, buscará cumplir sus sueños e ideales en las sagas del universo celeste.'),
(5, 'Hechicero', 'Este dominio es propio de los místicos hechiceros, representantes en esta era de los saberes y la magia del mundo antiguo. Estos personajes son poseedores de un talento único, una destreza capaz de manipular los canales mágicos que sustentan el universo. Los eruditos del arte de la hechicería también conocido como Jujutsu, son quienes representan el legado de los secretos mágicos de la antigua raza ryujin, milenarios dragones que en antaño regían sobre los cinco elementos. \r\n\r\nEn los tiempos presentes, los saberes elementales de este dominio pertenecen a las reconocidas academias, torres arcanas, y los clanes nobles más prestigiosos de los reinos. Sus practicantes son académicos determinados a los antiguos conocimientos, quienes tras años de estudio y práctica sobre los hechizos de los diferentes ryus, logran dominar poderosos sellos y conjuraciones, capaces de manifestar diversos e impresionantes efectos mágicos. También este dominio está vinculado a los antiguos templos religiosos, donde los onmyouji, monjes hechiceros, con gran sabiduría practican la magia sagrada de la luz y del ryu espiritual, dominando hechizos capaces de confrontar a las presencias oscuras que acechan en el universo. \r\n\r\nAntagonizando los nobles paradigmas de los antiguos ryus, existen maestros de este dominio a los que los llama brujos, estos son hechiceros perversos que practican el siniestro ryu de oscuridad. Este estilo de magia demoníaca sirve a las influencias del mal, originada y legada por temibles demonios, con el fin de corromper y destruir la vida armoniosa del universo celeste. \r\n\r\nEl extraordinario Jujutsu, arte de la hechiceria, encierra un conjunto de precisas técnicas las cuales son la llave a diversos estilos de magia llamados ryus. Dado que los caminos de los ryus guardan diferentes paradigmas, los estilos de los practicantes de cada línea mágica suelen ser muy variados, existiendo eruditos como así también temerarios guerreros, capaces de invocar poderosos hechizos de combate. Las técnicas del arte de la hechicería dotan de la capacidad de descifrar los campos mágicos, liberar hechizos de encantamientos sobre objetos, lugares y personas que sellaran a los mismo con fascinantes capacidades, asi como tambien invocar diversas conjuraciones que resolverán contundentemente las situaciones adversas que se presenten. En su grado de técnica máxima, el hechicero será capaz de dominar una concentración que canalizará en él las energías de su entorno, revigorizando así su ki para alimentar sus invocaciones mágicas.\r\n\r\nEstos personajes historia tras historia, con gran determinación avanzaran en sus círculos arcanos, lograrando convertirse en pináculo de la magia de las sagas del universo.'),
(6, 'Maestro espiritual', 'Este dominio es caracterizado por los maestros espirituales, seres capaces de comprender e interactuar con las esencias invisibles del mundo que los rodea, fuerzas que desde los inicios de los tiempos coexisten con el mundo de los vivos. Estos personajes son los guardianes de los campos espirituales que ayudan a preservar el balance fundamental de las fuerzas primordiales en el universo celeste, velando por encaminar las almas de los espíritus varados en este mundo hacia el descanso en paz, preservando el balance con las esencias de la naturaleza que nutren cada escenario del universo, y combatiendo incansablemente contra los temibles Ayakashis, quienes representan la verdadera esencia de los males en esta era. Un maestro espiritual siempre con sabiduría y apoyado por su familiar Shikigami combatirá contra toda presencia oscura que pretenda quebrar la armonía del universo.\r\n\r\nLos saberes de este dominio están vinculados a los antiguos templos y sectas religiosas, monjes onmyoji y sacerdotisas son quienes representan los antiguos paradigmas de los armoniosos kamis, dioses naturales del universo celeste. Estos practicantes del dominio espiritual desinteresadamente acudiran siempre donde el mal habite y prolifere, purificando y conteniendo la corrupción de sus influencias, como así también librando batalla si fuera necesario. Por otro lado también existen maestros espirituales que bajo sus propios principios, utilizando las habilidades de este dominio buscarán enfrentar las diversas precencias oscuras Yokai para preservar el orden del mundo que los rodea. \r\n\r\nEl arte espiritual llamado Reiso dotará a sus practicantes de místicas técnicas que le permitirán percibir e interactuar con el mundo invisible, unir su alma en alianza a un espíritu que lo acompañara bajo un fuerte propósito, manifestar en su cuerpo un aura de protección contra las presencias Yokai capaz de soportar sus letales ataques, además de poder restablecer la fuerza espiritual propia y de sus aliados. En su grado de técnica máxima llamado “Nexo de almas”,un maestro espiritual podrá sincronizar su alma a la de su espíritu Shikigami, el cual posesionara un objeto u armamento para brindarle a su maestro sus aptitudes y poderes, unificando sus fuerzas para hacer cumplir sus propósitos juntos.\r\n\r\nUn maestro espiritual será un personaje de grandes saberes antiguos, que junto a su espíritu Shikigami, representará el nexo del mundo invisible con el mundo de los vivos. Estos misticos protagonistas buscarán confrontar las diversas fuerzas oscuras cuando estas se presenten, preservando el orden y la armonía en el universo. ');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventarios`
--
-- Creación: 25-03-2024 a las 22:51:01
--

CREATE TABLE `inventarios` (
  `idInventario` int(11) NOT NULL,
  `item` varchar(200) DEFAULT NULL,
  `idpersonaje_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes`
--
-- Creación: 15-04-2024 a las 21:55:43
--

CREATE TABLE `personajes` (
  `idpersonaje` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `raza` varchar(20) DEFAULT NULL,
  `naturaleza` varchar(20) DEFAULT NULL,
  `dominio` varchar(100) DEFAULT NULL,
  `fuerza` int(11) DEFAULT NULL,
  `fortaleza` int(11) DEFAULT NULL,
  `ki` int(11) DEFAULT NULL,
  `kiActual` int(11) DEFAULT NULL,
  `faseSalud` int(11) DEFAULT NULL,
  `vidaTotal` int(11) DEFAULT NULL,
  `damageActual` int(11) DEFAULT NULL,
  `ken` int(11) DEFAULT NULL,
  `kenActual` int(11) DEFAULT NULL,
  `imagen` varchar(200) DEFAULT NULL,
  `destreza` int(11) DEFAULT NULL,
  `agilidad` int(11) DEFAULT NULL,
  `sabiduria` int(11) DEFAULT NULL,
  `sentidos` int(11) DEFAULT NULL,
  `presencia` int(11) DEFAULT NULL,
  `principio` int(11) DEFAULT NULL,
  `academisismo` int(11) DEFAULT NULL,
  `artesMarciales` int(11) DEFAULT NULL,
  `atletismo` int(11) DEFAULT NULL,
  `conBakemono` int(11) DEFAULT NULL,
  `conDemonio` int(11) DEFAULT NULL,
  `conEsferas` int(11) DEFAULT NULL,
  `conEspiritual` int(11) DEFAULT NULL,
  `forja` int(11) DEFAULT NULL,
  `medicina` int(11) DEFAULT NULL,
  `montar` int(11) DEFAULT NULL,
  `sigilo` int(11) DEFAULT NULL,
  `pilotear` int(11) DEFAULT NULL,
  `manejoArma` int(11) DEFAULT NULL,
  `conObjMagicos` int(11) DEFAULT NULL,
  `conLeyendas` int(11) DEFAULT NULL,
  `resCorte` int(11) DEFAULT NULL,
  `resEnergia` int(11) DEFAULT NULL,
  `resRayo` int(11) DEFAULT NULL,
  `resFuego` int(11) DEFAULT NULL,
  `resFrio` int(11) DEFAULT NULL,
  `resVeneno` int(11) DEFAULT NULL,
  `manejoSombras` int(11) DEFAULT NULL,
  `tratoBakemono` int(11) DEFAULT NULL,
  `conHechiceria` int(11) DEFAULT NULL,
  `meditacionEspiritual` int(11) DEFAULT NULL,
  `meditacionVital` int(20) DEFAULT NULL,
  `idusuario_fk` int(11) DEFAULT NULL,
  `cantFases` int(11) DEFAULT NULL,
  `fasesPos` int(11) DEFAULT NULL,
  `fasesNeg` int(11) DEFAULT NULL,
  `idDominio_fk` int(11) DEFAULT NULL,
  `idTecnica_fk` int(11) DEFAULT NULL,
  `nombreArma` varchar(50) DEFAULT NULL,
  `consumicionKi` int(11) DEFAULT NULL,
  `imagenFile` blob DEFAULT NULL,
  `historia` text DEFAULT NULL,
  `nivelDestino` int(11) DEFAULT NULL,
  `puntosDestino` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes`
--

INSERT INTO `personajes` (`idpersonaje`, `nombre`, `raza`, `naturaleza`, `dominio`, `fuerza`, `fortaleza`, `ki`, `kiActual`, `faseSalud`, `vidaTotal`, `damageActual`, `ken`, `kenActual`, `imagen`, `destreza`, `agilidad`, `sabiduria`, `sentidos`, `presencia`, `principio`, `academisismo`, `artesMarciales`, `atletismo`, `conBakemono`, `conDemonio`, `conEsferas`, `conEspiritual`, `forja`, `medicina`, `montar`, `sigilo`, `pilotear`, `manejoArma`, `conObjMagicos`, `conLeyendas`, `resCorte`, `resEnergia`, `resRayo`, `resFuego`, `resFrio`, `resVeneno`, `manejoSombras`, `tratoBakemono`, `conHechiceria`, `meditacionEspiritual`, `meditacionVital`, `idusuario_fk`, `cantFases`, `fasesPos`, `fasesNeg`, `idDominio_fk`, `idTecnica_fk`, `nombreArma`, `consumicionKi`, `imagenFile`, `historia`, `nivelDestino`, `puntosDestino`) VALUES
(191, 'Zanza Yagami', 'Humano linaje Yagami', 'Bueno Heroico', 'Guerrero de las artes marciales', 0, 0, 16, 15, 16, 96, 32, 585, 85, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzIV-wIJB64jokmBiy7GowMuV8DGSnLmtxSSntPYBLuQ&s', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 3, 3, NULL, NULL, '', 12, 0x5b6f626a6563742046696c655d, 'Kimura Keji: la historai de un guerrero Jinken', 5, 9),
(218, 'jino', 'Medio demonio ', 'Caotico', 'Maestro de sombras', 11, 19, 30, 30, 49, 294, 29, 113, 113, 'https://i.pinimg.com/550x/71/26/58/712658a265139451dcf20cf8c7965e14.jpg', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16, 6, 3, 3, NULL, NULL, '', 0, '', '', 1, 0),
(219, 'pirulo', '', '', 'Maestro de armas', 0, 11, 9, 9, 20, 120, 24, 15, 15, 'https://i.pinimg.com/236x/c0/2f/16/c02f160d233f14499c4b04855cbb0587.jpg', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 6, 3, 3, NULL, NULL, '', 0, '', NULL, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes_dominios_tecnicas`
--
-- Creación: 21-03-2024 a las 00:03:54
--

CREATE TABLE `personajes_dominios_tecnicas` (
  `id` int(11) NOT NULL,
  `idPersonaje_fk` int(11) DEFAULT NULL,
  `idDominio_fk` int(11) DEFAULT NULL,
  `idTecnica_fk` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes_dominios_tecnicas`
--

INSERT INTO `personajes_dominios_tecnicas` (`id`, `idPersonaje_fk`, `idDominio_fk`, `idTecnica_fk`) VALUES
(616, 191, 1, 1),
(617, 191, 1, 2),
(618, 191, 1, 3),
(619, 191, 1, 4),
(620, 191, 1, 5),
(621, 218, 2, 6),
(622, 218, 2, 7),
(623, 218, 2, 8),
(624, 218, 2, 9),
(625, 218, 2, 10),
(626, 219, 4, 16),
(627, 219, 4, 17);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personajes_sagas`
--
-- Creación: 10-04-2024 a las 16:41:19
--

CREATE TABLE `personajes_sagas` (
  `personajes_sagas` int(11) NOT NULL,
  `idSaga_fk` int(11) NOT NULL,
  `idpersonaje_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personajes_sagas`
--

INSERT INTO `personajes_sagas` (`personajes_sagas`, `idSaga_fk`, `idpersonaje_fk`) VALUES
(73, 19, 191),
(89, 21, 191),
(90, 19, 218),
(91, 22, 219),
(92, 22, 218),
(93, 22, 191);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sagas`
--
-- Creación: 10-04-2024 a las 14:03:28
--

CREATE TABLE `sagas` (
  `idSaga` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `idpersonaje_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sagas`
--

INSERT INTO `sagas` (`idSaga`, `nombre`, `descripcion`, `idpersonaje_fk`) VALUES
(16, 'dasdasd', NULL, 0),
(17, 'tttttttttttt', NULL, 0),
(18, 'sdffgsdf', NULL, 0),
(19, 'Miura', NULL, 0),
(20, 'Octavo Valle', NULL, 0),
(21, 'dragon oscuro', NULL, 0),
(22, 'Kao', NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicas`
--
-- Creación: 19-03-2024 a las 18:11:19
--

CREATE TABLE `tecnicas` (
  `idTecnica` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text NOT NULL,
  `sistema` text NOT NULL,
  `costeKi` int(11) DEFAULT NULL,
  `tiempoInvo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tecnicas`
--

INSERT INTO `tecnicas` (`idTecnica`, `nombre`, `descripcion`, `sistema`, `costeKi`, `tiempoInvo`) VALUES
(1, 'Golpe de energia', 'Un ataque de energia ', '', 1, 'instantanea'),
(2, 'Volar por los cielos', '', '', 5, 'instantanea'),
(3, 'Fortaleza ferrea', '', '', 5, 'instantanea'),
(4, 'Descarga de fuerza vital', '', '', 1, 'instantanea'),
(5, 'Explosion de Ki', '', '', 5, 'un turno'),
(6, 'Despertar armamento', '', '', 5, 'Una hora'),
(7, 'Corte de energia', '', '', 3, 'instantanea'),
(8, 'Ataque preciso', '', '', 5, 'instantanea'),
(9, 'Onda de ataque', '', '', 1, 'instantanea'),
(10, 'Liberar arma unica', '', '', 5, 'Un turno'),
(11, 'Aura de confianza', '', '', 2, 'instantanea'),
(12, 'Clonar formas', '', '', 1, 'instantanea'),
(13, 'Desvanecimiento sombrio', '', '', 5, 'accion rapida'),
(14, 'Paso de sombras', '', '', 5, 'instantanea'),
(15, 'Clones ilusorios', '', '', 2, 'instantanea'),
(16, 'Liberar sello', '', '', 0, 'segun hechizo'),
(17, 'Relicario magico', '', '', 1, 'instantanea'),
(18, 'Percepcion de los mahos', '', '', 5, 'instantaneo'),
(19, 'Liberar conjuracion', '', '', 0, 'segun hechizo'),
(20, 'Dominio de la energia vital', '', '', 3, 'un turno'),
(21, 'Empatia Bakemono', '', '', 0, 'permanente'),
(22, 'Sanar heridas Bakemono', '', '', 5, 'Un turno'),
(23, 'Nakama Bakemono', '', '', 5, 'instantaneo'),
(24, 'Fortaleza salvaje', '', '', 5, 'instantanea'),
(25, 'Esencia natural', '', '', NULL, NULL),
(26, 'Percibir el mundo invisible', '', '', NULL, NULL),
(27, 'Guardian Shikigami', '', '', NULL, NULL),
(28, 'Barrera Kekkai', '', '', 5, 'instantanea'),
(29, 'Fuerza espiritual', '', '', 5, 'Un turno'),
(30, 'Nexo de almas', '', '', 5, 'Un turno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicasespeciales`
--
-- Creación: 25-03-2024 a las 14:47:21
--

CREATE TABLE `tecnicasespeciales` (
  `idTecnicaEspecial` int(11) NOT NULL,
  `nombre` varchar(200) DEFAULT NULL,
  `coste` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `sistema` text DEFAULT NULL,
  `tiempoInvo` varchar(200) DEFAULT NULL,
  `idpersonaje_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--
-- Creación: 13-03-2024 a las 21:18:07
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nombreusuario` varchar(255) DEFAULT NULL,
  `contrasenia` varchar(100) DEFAULT NULL,
  `idpersonaje_fk` int(11) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `permiso` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombreusuario`, `contrasenia`, `idpersonaje_fk`, `estado`, `permiso`) VALUES
(7, 'caleto@gmail.com', 'misterpopo', NULL, '1', '0'),
(15, 'jorrinalma11@gmail.com', 'alma', NULL, '1', '0'),
(16, 'tempesttempest66@gmail.com', '1q2w3e', NULL, '1', '2'),
(20, 'juanyacoviello@hotmail.com', '1q2w3e', NULL, '1', '0'),
(24, 'denisepichon29@gmail.com', 'amor', NULL, '1', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ventajas`
--
-- Creación: 22-03-2024 a las 17:43:34
--

CREATE TABLE `ventajas` (
  `idVentaja` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `coste` int(11) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `idpersonaje_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `dominios`
--
ALTER TABLE `dominios`
  ADD PRIMARY KEY (`idDominio`);

--
-- Indices de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD PRIMARY KEY (`idInventario`),
  ADD KEY `idpersonaje_fk` (`idpersonaje_fk`);

--
-- Indices de la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD PRIMARY KEY (`idpersonaje`),
  ADD KEY `idDominio_fk` (`idDominio_fk`),
  ADD KEY `idTecnica_fk` (`idTecnica_fk`);

--
-- Indices de la tabla `personajes_dominios_tecnicas`
--
ALTER TABLE `personajes_dominios_tecnicas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPersonaje_fk` (`idPersonaje_fk`),
  ADD KEY `idDominio_fk` (`idDominio_fk`),
  ADD KEY `idTecnica_fk` (`idTecnica_fk`);

--
-- Indices de la tabla `personajes_sagas`
--
ALTER TABLE `personajes_sagas`
  ADD PRIMARY KEY (`personajes_sagas`),
  ADD KEY `idSaga_fk` (`idSaga_fk`),
  ADD KEY `idpersonaje_fk` (`idpersonaje_fk`);

--
-- Indices de la tabla `sagas`
--
ALTER TABLE `sagas`
  ADD PRIMARY KEY (`idSaga`);

--
-- Indices de la tabla `tecnicas`
--
ALTER TABLE `tecnicas`
  ADD PRIMARY KEY (`idTecnica`);

--
-- Indices de la tabla `tecnicasespeciales`
--
ALTER TABLE `tecnicasespeciales`
  ADD PRIMARY KEY (`idTecnicaEspecial`),
  ADD KEY `idpersonaje_fk` (`idpersonaje_fk`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`),
  ADD KEY `idpersonaje_fk` (`idpersonaje_fk`);

--
-- Indices de la tabla `ventajas`
--
ALTER TABLE `ventajas`
  ADD PRIMARY KEY (`idVentaja`),
  ADD KEY `idpersonaj` (`idpersonaje_fk`),
  ADD KEY `idPersonaje_fk` (`idpersonaje_fk`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `dominios`
--
ALTER TABLE `dominios`
  MODIFY `idDominio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `inventarios`
--
ALTER TABLE `inventarios`
  MODIFY `idInventario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `personajes`
--
ALTER TABLE `personajes`
  MODIFY `idpersonaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT de la tabla `personajes_dominios_tecnicas`
--
ALTER TABLE `personajes_dominios_tecnicas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=628;

--
-- AUTO_INCREMENT de la tabla `personajes_sagas`
--
ALTER TABLE `personajes_sagas`
  MODIFY `personajes_sagas` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- AUTO_INCREMENT de la tabla `sagas`
--
ALTER TABLE `sagas`
  MODIFY `idSaga` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tecnicas`
--
ALTER TABLE `tecnicas`
  MODIFY `idTecnica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `tecnicasespeciales`
--
ALTER TABLE `tecnicasespeciales`
  MODIFY `idTecnicaEspecial` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=126;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idusuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `ventajas`
--
ALTER TABLE `ventajas`
  MODIFY `idVentaja` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=170;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `inventarios`
--
ALTER TABLE `inventarios`
  ADD CONSTRAINT `inventarios_ibfk_1` FOREIGN KEY (`idpersonaje_fk`) REFERENCES `personajes` (`idpersonaje`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personajes`
--
ALTER TABLE `personajes`
  ADD CONSTRAINT `personajes_ibfk_1` FOREIGN KEY (`idDominio_fk`) REFERENCES `dominios` (`idDominio`),
  ADD CONSTRAINT `personajes_ibfk_2` FOREIGN KEY (`idTecnica_fk`) REFERENCES `tecnicas` (`idTecnica`);

--
-- Filtros para la tabla `personajes_dominios_tecnicas`
--
ALTER TABLE `personajes_dominios_tecnicas`
  ADD CONSTRAINT `personajes_dominios_tecnicas_ibfk_1` FOREIGN KEY (`idPersonaje_fk`) REFERENCES `personajes` (`idpersonaje`),
  ADD CONSTRAINT `personajes_dominios_tecnicas_ibfk_2` FOREIGN KEY (`idDominio_fk`) REFERENCES `dominios` (`idDominio`),
  ADD CONSTRAINT `personajes_dominios_tecnicas_ibfk_3` FOREIGN KEY (`idTecnica_fk`) REFERENCES `tecnicas` (`idTecnica`),
  ADD CONSTRAINT `personajes_dominios_tecnicas_ibfk_4` FOREIGN KEY (`idPersonaje_fk`) REFERENCES `personajes` (`idpersonaje`),
  ADD CONSTRAINT `personajes_dominios_tecnicas_ibfk_5` FOREIGN KEY (`idDominio_fk`) REFERENCES `dominios` (`idDominio`),
  ADD CONSTRAINT `personajes_dominios_tecnicas_ibfk_6` FOREIGN KEY (`idTecnica_fk`) REFERENCES `tecnicas` (`idTecnica`);

--
-- Filtros para la tabla `personajes_sagas`
--
ALTER TABLE `personajes_sagas`
  ADD CONSTRAINT `personajes_sagas_ibfk_1` FOREIGN KEY (`idSaga_fk`) REFERENCES `sagas` (`idSaga`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `personajes_sagas_ibfk_2` FOREIGN KEY (`idpersonaje_fk`) REFERENCES `personajes` (`idpersonaje`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tecnicasespeciales`
--
ALTER TABLE `tecnicasespeciales`
  ADD CONSTRAINT `tecnicasespeciales_ibfk_1` FOREIGN KEY (`idpersonaje_fk`) REFERENCES `personajes` (`idpersonaje`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`idpersonaje_fk`) REFERENCES `personajes` (`idpersonaje`);

--
-- Filtros para la tabla `ventajas`
--
ALTER TABLE `ventajas`
  ADD CONSTRAINT `ventajas_ibfk_1` FOREIGN KEY (`idPersonaje_fk`) REFERENCES `personajes` (`idpersonaje`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ventajas_ibfk_2` FOREIGN KEY (`idpersonaje_fk`) REFERENCES `personajes` (`idpersonaje`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
