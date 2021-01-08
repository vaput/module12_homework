/**
 * Базовый "класс" электроприбор
 */
function ElectricalAppliance(name, power) {
    this.name = name;
    this.power = power;
    this.isPluggedIn = false;
}

ElectricalAppliance.prototype.plugIn = function () {
    this.isPluggedIn = true;
}

ElectricalAppliance.prototype.plugOut = function () {
    this.isPluggedIn = false;
}

ElectricalAppliance.prototype.getName = function () {
    return this.name;
}

ElectricalAppliance.prototype.getPower = function () {
    if (!this.isPluggedIn)
        return 0;
    return this.power;
}

/**
 * Наследник электроприбора - лампа
 */
function Lamp(name, power) {
    //Вызываем конструктор родительского "класса"
    ElectricalAppliance.apply(this, arguments);

    //Добавляем собственное свойство яркость, которого нет в базовом электроприборе
    this.brightness = 0;
}

//Указываем, что прототипом лампы является электроприбор
Lamp.prototype = Object.create(ElectricalAppliance.prototype);

//Функция увеличения яркости
Lamp.prototype.increaseBrightness = function () {
    if (this.brightness < 1)
        this.brightness += 0.1;
}

//Функция уменьшения яркости
Lamp.prototype.decreaseBrightness = function () {
    if (this.brightness > 0)
        this.brightness -= 0.1;
}

//Переопределяем функцию получения мощности лампы в зависимости от яркости
Lamp.prototype.getPower = function () {
    //Вызываем родительские метод в контексте лампы, чтобы не дублировать код проверки подключения к розетке
    let basePower = ElectricalAppliance.prototype.getPower.call(this);
    return basePower * this.brightness;
}

/**
 * Наследник электроприбора - компьютер
 */
function Computer(name, power, monitorPower) {
    //Вызываем конструктор родительского "класса"
    ElectricalAppliance.apply(this, arguments);

    //Добавляем свои собственные свойства
    this.monitorPower = monitorPower;
    this.isMonitorTurnedOn = false;
}

//Указываем, что прототипом лампы является электроприбор
Computer.prototype = Object.create(ElectricalAppliance.prototype);

//Включаем монитор
Computer.prototype.turnOnMonitor = function () {
    this.isMonitorTurnedOn = true;
}

//Выключаем монитор
Computer.prototype.turnOffMonitor = function () {
    this.isMonitorTurnedOn = false;
}

//Переопределяем функцию получения мощности с учетом включенности монитора
Computer.prototype.getPower = function () {
    //Вызываем родительские метод в контексте лампы, чтобы не дублировать код проверки подключения к розетке
    let basePower = ElectricalAppliance.prototype.getPower.call(this);
    //Если монитор включен, то прибавляем к общей мощности
    if (this.isMonitorTurnedOn)
        basePower += this.monitorPower;
    return basePower;
}

/**
 * Проверяем как все работает
 */
let lamp1 = new Lamp('Настольная лампа', 60);
lamp1.plugIn();
lamp1.increaseBrightness();
lamp1.increaseBrightness();

let lamp2 = new Lamp('Прикроватная лампа', 100);
lamp2.plugIn();
lamp2.increaseBrightness();
lamp2.increaseBrightness();
lamp2.increaseBrightness();

let computer1 = new Computer('Домашний компьютер', 850, 220);
computer1.plugIn();
computer1.turnOnMonitor();

let computer2 = new Computer('Рабочий компьютер', 600, 220);
computer2.plugIn();

let computer3 = new Computer('Второй домашний компьютер', 550, 220);

console.log(
    "Общая мощность " +
    parseInt(
        lamp1.getPower() + lamp2.getPower() + computer1.getPower() + computer2.getPower() + computer3.getPower()
    )
);