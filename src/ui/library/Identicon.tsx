import React from 'react';
import {View} from 'react-native';
import Svg, {Circle as SvgCircle} from 'react-native-svg';
import {useCryptoUtil} from '@polkadotApi/useCryptoUtil';
import {useNetwork} from 'src/atoms/network';
import {hexToU8a, u8aToHex} from '@polkadot/util';

type Circle = {
  cx: number;
  cy: number;
  fill: string;
  r: number;
};

type Scheme = {
  freq: number;
  colors: number[];
};

const S = 64;
const C = S / 2;
const Z = (S / 64) * 5;

const SCHEMA: {[index: string]: Scheme} = {
  target: {colors: [0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 0, 28, 0, 1], freq: 1},
  cube: {colors: [0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 0, 1, 3, 2, 4, 3, 5], freq: 20},
  quazar: {colors: [1, 2, 3, 1, 2, 4, 5, 5, 4, 1, 2, 3, 1, 2, 4, 5, 5, 4, 0], freq: 16},
  flower: {colors: [0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 0, 1, 2, 3], freq: 32},
  cyclic: {colors: [0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 6], freq: 32},
  vmirror: {colors: [0, 1, 2, 3, 4, 5, 3, 4, 2, 0, 1, 6, 7, 8, 9, 7, 8, 6, 10], freq: 128},
  hmirror: {colors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 8, 6, 7, 5, 3, 4, 2, 11], freq: 128},
};

const OUTER_CIRCLE: Circle = {
  cx: C,
  cy: C,
  fill: '#eee',
  r: C,
};

function getRotation(isSixPoint: boolean): {
  r: number;
  ro2: number;
  r3o4: number;
  ro4: number;
  rroot3o2: number;
  rroot3o4: number;
} {
  const r = isSixPoint ? (C / 8) * 5 : (C / 4) * 3;
  const rroot3o2 = (r * Math.sqrt(3)) / 2;
  const ro2 = r / 2;
  const rroot3o4 = (r * Math.sqrt(3)) / 4;
  const ro4 = r / 4;
  const r3o4 = (r * 3) / 4;

  return {r, r3o4, ro2, ro4, rroot3o2, rroot3o4};
}

function getCircleXY(isSixPoint: boolean): [number, number][] {
  const {r, r3o4, ro2, ro4, rroot3o2, rroot3o4} = getRotation(isSixPoint);

  return [
    [C, C - r],
    [C, C - ro2],
    [C - rroot3o4, C - r3o4],
    [C - rroot3o2, C - ro2],
    [C - rroot3o4, C - ro4],
    [C - rroot3o2, C],
    [C - rroot3o2, C + ro2],
    [C - rroot3o4, C + ro4],
    [C - rroot3o4, C + r3o4],
    [C, C + r],
    [C, C + ro2],
    [C + rroot3o4, C + r3o4],
    [C + rroot3o2, C + ro2],
    [C + rroot3o4, C + ro4],
    [C + rroot3o2, C],
    [C + rroot3o2, C - ro2],
    [C + rroot3o4, C - ro4],
    [C + rroot3o4, C - r3o4],
    [C, C],
  ];
}

function findScheme(d: number): Scheme {
  let cum = 0;
  const schema = Object.values(SCHEMA).find((_schema): boolean => {
    cum += _schema.freq;

    return d < cum;
  });

  if (!schema) {
    throw new Error('Unable to find schema');
  }

  return schema;
}

function useGenerateCircles(value: string, isAlternative: boolean) {
  const {currentNetwork} = useNetwork();
  const {decodeAddress, blake2AsHex, isReady} = useCryptoUtil();
  const [circles, setCircles] = React.useState<Circle[]>([]);
  const xy = React.useMemo(() => getCircleXY(isAlternative), [isAlternative]);

  React.useEffect(() => {
    const prepareCircles = async () => {
      let colors = new Array<string>(xy.length).fill('#ddd');

      if (isReady) {
        const total = Object.values(SCHEMA)
          .map((s): number => s.freq)
          .reduce((a, b): number => a + b);
        const decodedAddress = await decodeAddress({encoded: value, ss58Format: currentNetwork.ss58Format});
        const blake2Result = hexToU8a(await blake2AsHex({data: decodedAddress, bitLength: 512}));
        const zeroHash = hexToU8a(await blake2AsHex({data: u8aToHex(new Uint8Array(32)), bitLength: 512}));
        const id = blake2Result.map((x, i) => {
          const zeroHashValue = zeroHash[i] as number;
          return (x + 256 - zeroHashValue) % 256;
        });

        const id28 = id[28] as number;
        const id29 = id[29] as number;
        const id30 = id[30] as number;
        const id31 = id[31] as number;

        const d = Math.floor((id30 + id31 * 256) % total);
        const rot = (id28 % 6) * 3;
        const sat = (Math.floor((id29 * 70) / 256 + 26) % 80) + 30;
        const scheme = findScheme(d);

        const palette = Array.from(id).map((x, i): string => {
          const b = (x + (i % 28) * 58) % 256;

          if (b === 0) {
            return '#444';
          } else if (b === 255) {
            return 'transparent';
          }

          const h = Math.floor(((b % 64) * 360) / 64);
          const l = [53, 15, 35, 75][Math.floor(b / 64)];

          return `hsl(${h}, ${sat}%, ${l}%)`;
        });

        colors = scheme.colors.map((_, i) => {
          const colorIndex = i < 18 ? (i + rot) % 18 : 18;
          const palletIndex = scheme.colors[colorIndex] as number;
          return palette[palletIndex] as string;
        });
      }

      const _circles = [OUTER_CIRCLE].concat(
        xy.map(
          ([cx, cy], index): Circle => ({
            cx,
            cy,
            fill: colors[index] as string,
            r: Z,
          }),
        ),
      );

      setCircles(_circles);
    };

    prepareCircles().catch(console.log);
  }, [value, blake2AsHex, currentNetwork.ss58Format, decodeAddress, isReady, xy]);

  return {
    circles,
  };
}

function renderCircle({cx, cy, fill, r}: Circle, key: number) {
  return <SvgCircle cx={cx} cy={cy} fill={fill} key={key} r={r} />;
}

type Props = {
  value: string;
  isAlternative?: boolean;
  size?: number;
};

export function Identicon({value, isAlternative = false, size = 20}: Props) {
  const {circles} = useGenerateCircles(value, isAlternative);

  return (
    <View>
      <Svg height={size} viewBox="0 0 64 64" width={size}>
        {circles.map(renderCircle)}
      </Svg>
    </View>
  );
}
