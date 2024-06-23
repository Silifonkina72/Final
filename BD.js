stain - морилка;
solvent - растворитель;
ground - грунт;
lak - лак;
primer_insulator - грунтовка-изолятор
paint - краска
high_grade - высокопробная
acrylic_primer - акриловый грунт
patina - патина


['массив'], ['мдф'], ['морилка'], ['растворитель'], ['грунт'], ['лак'],  ['грунтовка-изолятор'], ['краска'], ['высокопробная', 'краска'], ['акриловый'], ['патина'], ['технология', 'покраски']
режим работы, адреса

const responses = [
    { keywords: ['массив'], response: 'Если вы хотите придать древесине цвет, вам необходимо выбрать 3 компонента: морилка, грунт и лак. Если такой необходимости нет, то неохлдим грунт и лак.' },
    { keywords: ['мдф'], response: 'Если вы хотите придать поверхности эффект старения или изменения оттенка, вам необходимо будет выбрать 6 компонентов: грунт-изолятор, заполняющий грунт, краску, акриловый грунт, патину и лак. Если такой необходимости нет, то необходимо выбрать 3 компонента: грунт-изолятор, заполняющий грунт и краску.' },
    { keywords: ['морилка'], response: 'Морилка – это специальное средство для окрашивания древесины, которое придает ей желаемый оттенок.' },
    { keywords: ['растворитель'], response: 'Растворитель – это химическое вещество, используемое для разбавления красок и лаков.' },
    { keywords: ['грунт'], response: 'Грунт – это основное покрытие, наносимое на поверхность перед окончательной отделкой, чтобы обеспечить адгезию и защиту.' },
    { keywords: ['лак'], response: 'Лак – это прозрачное или окрашенное покрытие, наносимое на поверхность для защиты и придания блеска.' },
    { keywords: ['грунтовка-изолятор'], response: 'Грунтовка-изолятор – это специальная грунтовка, предназначенная для изоляции поверхностей от влаги или других веществ.' },
    { keywords: ['краска'], response: 'Краска – это материал, используемый для окрашивания поверхностей.' },
    { keywords: ['высокопробная'], response: 'Высокопробная краска – это краска, обладающая высокой степенью качества и устойчивости к внешним воздействиям.' },
    { keywords: ['акриловый'], response: 'Акриловый – это материал или покрытие на основе акрила, обычно обладающее хорошей стойкостью и эластичностью.' },
    { keywords: ['патина'], response: 'Патина – это специальное средство для придания поверхности эффекта старения или изменения оттенка.' },
    { keywords: ['технология', 'покраски'], response: 'Технология покраски – это процесс применения краски, включающий подготовку поверхности, выбор материалов и способов нанесения.' },
    { keywords: ['выбор', 'выбрать'], response: 'Какой материал вы хотите использовать в качестве покраски? МДФ или Массив?' },
    { keywords: ['режим', 'работы'], response: 'все наши филиалы работают с 10.00-20.00 по местному времени без перерыва на обед.' },
    { keywords: ['адрес', 'адреса'], response: 'Уеажите ваш город.' },
    { keywords: ['адрес', 'адреса'], response: 'Вот список адрессов филиала, находящихся в вашем городе:' },
  ];