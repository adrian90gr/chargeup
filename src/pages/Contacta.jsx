import React from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import Cabecera from '../components/general/CabeceraComponent';
import Pie from '../components/general/PieComponent';
import { BreadCrumbsComponent } from '../components/general/BreadCrumbsComponent';
import { Link } from "react-router-dom";

export const Contacta = () => {
  return (
    <>
      <Cabecera />
      <BreadCrumbsComponent />
      <section className='flex flex-col justify-around items-center'>
        <form action="" className="w-full md:w-1/2 bg-slate-700 my-10 p-8 rounded-xl" aria-labelledby="contact-form">
          <h2 id="contact-form" className='text-center text-white text-2xl mb-5'>Contacta con Nosotros</h2>
          <div className='mb-4'>
            <Label htmlFor="nombre" className="block text-white mb-1">Nombre</Label>
            <TextInput id="nombre" type="text" placeholder="Tu nombre" required={true} aria-required="true" />
          </div>
          <div className='mb-4'>
            <Label htmlFor="email" className="block text-white mb-1">Correo Electrónico</Label>
            <TextInput id="email" type="email" placeholder="Tu correo electrónico" required={true} aria-required="true" />
          </div>
          <div className='mb-4'>
            <Label htmlFor="mensaje" className="block text-white mb-1">Mensaje</Label>
            <Textarea id="mensaje" placeholder="Escribe tu mensaje aquí" required={true} aria-required="true" />
          </div>
          <Button type="submit" className='w-full bg-cyan-500'>Enviar</Button>
        </form>

        <article className='w-full mb-10 flex flex-col items-center gap-4 md:flex-row md:gap-4 md:justify-around'>
          <Button size="xl" className='bg-cyan-500 w-3/4 md:w-1/4'>Teléfono: +34669887441</Button>
          <Button size="xl" className='bg-cyan-500 w-3/4 md:w-1/4'>
            <a href="mailto:chargeup20242025@gmail.com" className="w-full text-center">Correo Electrónico</a>
          </Button>
          <Button size="xl" className='bg-cyan-500 w-3/4 md:w-1/4'>
            <Link to='https://chat.whatsapp.com/DFsjnnBqnJBH2kpDT6pudy' className="w-full text-center">Comunidad WhatsApp</Link>
          </Button>
        </article>
      </section>
      <Pie />
    </>
  );
}
