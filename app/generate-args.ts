export function generateArgs(params: {
  symbol: string;
  username: string;
  hash: string;
}) {
  const { username, hash, symbol } = params;
  return [
    {
      name: `depefriend - ${username}`,
      symbol,
      uri: hash,
    },
    {
      mintRoyalty: 500,
      burnRoyalty: 500,
      reserveToken: '0x2B3006D34359F3C23429167a659b18cC9c6F8bcA',
      maxSupply: 1000n,
      stepRanges: [
        '15',
        '29',
        '44',
        '58',
        '73',
        '87',
        '102',
        '116',
        '131',
        '145',
        '160',
        '174',
        '189',
        '203',
        '218',
        '232',
        '247',
        '261',
        '276',
        '290',
        '305',
        '319',
        '334',
        '348',
        '363',
        '377',
        '392',
        '406',
        '421',
        '435',
        '450',
        '464',
        '479',
        '493',
        '508',
        '522',
        '537',
        '551',
        '566',
        '580',
        '595',
        '609',
        '624',
        '638',
        '653',
        '667',
        '682',
        '696',
        '711',
        '725',
        '740',
        '754',
        '769',
        '783',
        '798',
        '812',
        '827',
        '841',
        '856',
        '870',
        '885',
        '899',
        '914',
        '928',
        '943',
        '957',
        '972',
        '986',
        '1000',
      ].map(BigInt),
      stepPrices: [
        '4269000000000000000000',
        '4563561000000000000000',
        '4878446709000000000000',
        '5215059531921000000000',
        '5574898639623550000000',
        '5959566645757570000000',
        '6370776744314850000000',
        '6810360339672570000000',
        '7280275203109980000000',
        '7782614192124570000000',
        '8319614571381160000000',
        '8893667976806460000000',
        '9507331067206110000000',
        '10163336910843300000000',
        '10864607157691500000000',
        '11614265051572200000000',
        '12415649340130700000000',
        '13272329144599700000000',
        '14188119855577100000000',
        '15167100125611900000000',
        '16213630034279200000000',
        '17332370506644400000000',
        '18528304071602900000000',
        '19806757052543500000000',
        '21173423289169000000000',
        '22634389496121600000000',
        '24196162371354000000000',
        '25865697574977500000000',
        '27650430707650900000000',
        '29558310426478800000000',
        '31597833845905800000000',
        '33778084381273300000000',
        '36108772203581200000000',
        '38600277485628300000000',
        '41263696632136700000000',
        '44110891699754100000000',
        '47154543227037100000000',
        '50408206709702700000000',
        '53886372972672100000000',
        '57604532707786500000000',
        '61579245464623800000000',
        '65828213401682800000000',
        '70370360126398900000000',
        '75225914975120500000000',
        '80416503108403800000000',
        '85965241822883600000000',
        '91896843508662600000000',
        '98237725710760300000000',
        '105016128784803000000000',
        '112262241670954000000000',
        '120008336346250000000000',
        '128288911554141000000000',
        '137140846451377000000000',
        '146603564856522000000000',
        '156719210831622000000000',
        '167532836379004000000000',
        '179092602089155000000000',
        '191449991633307000000000',
        '204660041056005000000000',
        '218781583888869000000000',
        '233877513177201000000000',
        '250015061586428000000000',
        '267266100835892000000000',
        '285707461793568000000000',
        '305421276657324000000000',
        '326495344746680000000000',
        '349023523534201000000000',
        '373106146658060000000000',
        '426900000000000000000000',
      ].map(BigInt),
    },
  ] as const;
}
