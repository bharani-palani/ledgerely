/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import AppContext from '../../contexts/AppContext';
import SignedUrl from '../configuration/Gallery/SignedUrl';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  withHandlers,
  DirectionsRenderer,
} from 'react-google-maps';
import { Link } from 'react-router-dom';

const Div = ({ children, ...rest }) => {
  return <div {...rest}>{children}</div>;
};

const Section = ({ children, ...rest }) => {
  return <section {...rest}>{children}</section>;
};

const P = ({ children, ...rest }) => {
  return <p {...rest}>{children}</p>;
};

const H1 = ({ children, ...rest }) => {
  return <h1 {...rest}>{children}</h1>;
};

const H2 = ({ children, ...rest }) => {
  return <h2 {...rest}>{children}</h2>;
};

const H3 = ({ children, ...rest }) => {
  return <h3 {...rest}>{children}</h3>;
};

const H4 = ({ children, ...rest }) => {
  return <h4 {...rest}>{children}</h4>;
};

const H5 = ({ children, ...rest }) => {
  return <h5 {...rest}>{children}</h5>;
};

const H6 = ({ children, ...rest }) => {
  return <h6 {...rest}>{children}</h6>;
};

const Blockquote = ({ children, ...rest }) => {
  return <blockquote {...rest}>{children}</blockquote>;
};

const Fieldset = ({ children, ...rest }) => {
  return <fieldset {...rest}>{children}</fieldset>;
};

const Form = ({ children, ...rest }) => {
  return <form {...rest}>{children}</form>;
};

const Ol = ({ children, ...rest }) => {
  return <ol {...rest}>{children}</ol>;
};

const Ul = ({ children, ...rest }) => {
  return <ul {...rest}>{children}</ul>;
};

const Li = ({ children, ...rest }) => {
  return <li {...rest}>{children}</li>;
};

const Table = ({ children, ...rest }) => {
  return <table {...rest}>{children}</table>;
};

const Thead = ({ children, ...rest }) => {
  return <thead {...rest}>{children}</thead>;
};

const Tbody = ({ children, ...rest }) => {
  return <tbody {...rest}>{children}</tbody>;
};

const Tr = ({ children, ...rest }) => {
  return <tr {...rest}>{children}</tr>;
};

const Th = ({ children, ...rest }) => {
  return <th {...rest}>{children}</th>;
};

const Td = ({ children, ...rest }) => {
  return <td {...rest}>{children}</td>;
};

const I = ({ children, ...rest }) => {
  return <i {...rest} />;
};

const A = ({ children, ...rest }) => {
  return <a {...rest}>{children}</a>;
};

const Span = ({ children, ...rest }) => {
  return <span {...rest}>{children}</span>;
};

const Em = ({ children, ...rest }) => {
  return <em {...rest}>{children}</em>;
};

const Abbr = ({ children, ...rest }) => {
  return <abbr {...rest}>{children}</abbr>;
};

const Address = ({ children, ...rest }) => {
  return <address {...rest}>{children}</address>;
};

const Article = ({ children, ...rest }) => {
  return <article {...rest}>{children}</article>;
};

const Aside = ({ children, ...rest }) => {
  return <aside {...rest}>{children}</aside>;
};

const Audio = ({ children, ...rest }) => {
  return <audio {...rest}>{children}</audio>;
};

const Source = ({ children, ...rest }) => {
  return <source {...rest} />;
};

const B = ({ children, ...rest }) => {
  return <b {...rest}>{children}</b>;
};

const Bdo = ({ children, ...rest }) => {
  return <bdo {...rest}>{children}</bdo>;
};

const Button = ({ children, ...rest }) => {
  return <button {...rest}>{children}</button>;
};

const Canvas = ({ children, ...rest }) => {
  return <canvas {...rest}>{children}</canvas>;
};

const Cite = ({ children, ...rest }) => {
  return <cite {...rest}>{children}</cite>;
};

const Code = ({ children, ...rest }) => {
  return <code {...rest}>{children}</code>;
};

const Embed = ({ children, ...rest }) => {
  return <embed {...rest} />;
};

const Figcaption = ({ children, ...rest }) => {
  return <figcaption {...rest}>{children}</figcaption>;
};

const Figure = ({ children, ...rest }) => {
  return <figure {...rest}>{children}</figure>;
};

const Footer = ({ children, ...rest }) => {
  return <footer {...rest}>{children}</footer>;
};

const Hr = ({ children, ...rest }) => {
  return <hr {...rest} />;
};

const Header = ({ children, ...rest }) => {
  return <header {...rest}>{children}</header>;
};

const Hgroup = ({ children, ...rest }) => {
  return <hgroup {...rest}>{children}</hgroup>;
};

const Iframe = ({ children, ...rest }) => {
  return <iframe {...rest}>{children}</iframe>;
};

const Input = ({ children, ...rest }) => {
  return <input {...rest} />;
};

const Kbd = ({ children, ...rest }) => {
  return <kbd {...rest}>{children}</kbd>;
};

const Keygen = ({ children, ...rest }) => {
  return <keygen {...rest} />;
};

const Label = ({ children, ...rest }) => {
  return <label {...rest}>{children}</label>;
};
const Legend = ({ children, ...rest }) => {
  return <legend {...rest}>{children}</legend>;
};
const Main = ({ children, ...rest }) => {
  return <main {...rest}>{children}</main>;
};
const Mark = ({ children, ...rest }) => {
  return <mark {...rest}>{children}</mark>;
};

const Nav = ({ children, ...rest }) => {
  return <nav {...rest}>{children}</nav>;
};

const Optgroup = ({ children, ...rest }) => {
  return <optgroup {...rest}>{children}</optgroup>;
};

const Option = ({ children, ...rest }) => {
  return <option {...rest}>{children}</option>;
};

const Picture = ({ children, ...rest }) => {
  return <picture {...rest}>{children}</picture>;
};

const Pre = ({ children, ...rest }) => {
  return <pre {...rest}>{children}</pre>;
};

const Progress = ({ children, ...rest }) => {
  return <progress {...rest}>{children}</progress>;
};

const Select = ({ children, ...rest }) => {
  return <select {...rest}>{children}</select>;
};

const Small = ({ children, ...rest }) => {
  return <small {...rest}>{children}</small>;
};

const Strong = ({ children, ...rest }) => {
  return <strong {...rest}>{children}</strong>;
};

const Style = ({ children, ...rest }) => {
  return <style {...rest}>{children}</style>;
};

const Sub = ({ children, ...rest }) => {
  return <sub {...rest}>{children}</sub>;
};

const Summary = ({ children, ...rest }) => {
  return <summary {...rest}>{children}</summary>;
};

const Sup = ({ children, ...rest }) => {
  return <sup {...rest}>{children}</sup>;
};

const Svg = ({ children, ...rest }) => {
  return <svg {...rest} />;
};

const Path = ({ children, ...rest }) => {
  return <path {...rest} />;
};

const Template = ({ children, ...rest }) => {
  return <template {...rest}>{children}</template>;
};

const TextArea = ({ children, ...rest }) => {
  return <textArea {...rest}>{children}</textArea>;
};

const Tfoot = ({ children, ...rest }) => {
  return <tfoot {...rest}>{children}</tfoot>;
};

const Time = ({ children, ...rest }) => {
  return <time {...rest}>{children}</time>;
};

const Track = ({ children, ...rest }) => {
  return <track {...rest} />;
};

const U = ({ children, ...rest }) => {
  return <u {...rest}>{children}</u>;
};

const Video = ({ children, ...rest }) => {
  return <video {...rest}>{children}</video>;
};

const AwsMedia = ({ ...rest }) => {
  const [appData] = useContext(AppContext);
  return <SignedUrl appData={appData} {...rest} />;
};

// Note: props -> lat,lng
const GoogleMapsMarker = ({ ...rest }) => {
  return (
    <Marker
      position={{
        lat: rest.lat ? Number(rest.lat) : 25.589679787104245,
        lng: rest.lng ? Number(rest.lng) : 78.15448882485161,
      }}
    />
  );
};

const GoogleMapMain = withScriptjs(
  withGoogleMap(({ children, ...rest }) => {
    return (
      <GoogleMap
        defaultZoom={Number(rest.defaultZoom ? Number(rest.defaultZoom) : 0)}
        defaultCenter={{
          lat: rest.lat ? Number(rest.lat) : 25.589679787104245,
          lng: rest.lng ? Number(rest.lng) : 78.15448882485161,
        }}
      >
        {children}
      </GoogleMap>
    );
  })
);

// Note: props -> defaultZoom,lat,lng,height
const GoogleMaps = ({ children, ...rest }) => {
  const [appData] = useContext(AppContext);
  return (
    <GoogleMapMain
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${appData.google_map_api_key}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={
        <div style={{ height: rest.height ? `${rest.height}px` : '400px' }} />
      }
      mapElement={<div style={{ height: `100%` }} />}
      {...rest}
    >
      {children}
    </GoogleMapMain>
  );
};

export {
  Div,
  Section,
  P,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Blockquote,
  Fieldset,
  Form,
  Ol,
  Ul,
  Li,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  I,
  A,
  Span,
  Em,
  Abbr,
  Address,
  Article,
  Aside,
  Audio,
  B,
  Bdo,
  Button,
  Canvas,
  Cite,
  Code,
  Embed,
  Figcaption,
  Figure,
  Footer,
  Hr,
  Header,
  Hgroup,
  Iframe,
  Input,
  Kbd,
  Keygen,
  Label,
  Legend,
  Main,
  Mark,
  Nav,
  Optgroup,
  Option,
  Path,
  Picture,
  Pre,
  Progress,
  Select,
  Small,
  Source,
  Strong,
  Style,
  Sub,
  Summary,
  Sup,
  Svg,
  Template,
  TextArea,
  Tfoot,
  Time,
  Track,
  U,
  Video,
  AwsMedia,
  GoogleMaps,
  GoogleMapsMarker,
  Link,
};
