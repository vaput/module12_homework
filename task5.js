/**
 * Базовый класс электроприбор
 */
class ElectricalAppliance {
    constructor(name, power) {
        this.name = name;
        this.power = power;
        this.isPluggedIn = false;
    }

    plugIn() {
        this.isPluggedIn = true;
    }

    plugOut() {
        this.isPluggedIn = false;
    }

    getName() {
        return this.name;
    }

    getPower() {
        if (!this.isPluggedIn)
            return 0;
        return this.power;
    }
}

/**
 * Наследник электроприбора - лампа
 */
class Lamp extends ElectricalAppliance {
    constructor(name, power) {
        //Вызываем конструктор родительского "класса"
        super(name, power);
        //Добавляем собственное свойство яркость, которого нет в базовом электроприборе
        this.brightness = 0;
    }

    //Функция увеличения яркости
    increaseBrightness() {
        if (this.brightness < 1)
            this.brightness += 0.1;
    }

    //Функция уменьшения яркости
    decreaseBrightness() {
        if (this.brightness > 0)
            this.brightness -= 0.1;
    }

    //Переопределяем функцию получения мощности лампы в зависимости от яркости
    getPower() {
        //Вызываем родительские метод в контексте лампы, чтобы не дублировать код проверки подключения к розетке
        let basePower = super.getPower();
        return basePower * this.brightness;
    }
}

/**
 * Наследник электроприбора - компьютер
 */
class Computer extends ElectricalAppliance {
    constructor(name, power, monitorPower) {
        //Вызываем конструктор родительского "класса"
        super(name, power);
        //Добавляем свои собственные свойства
        this.monitorPower = monitorPower;
        this.isMonitorTurnedOn = false;
    }

    //Включаем монитор
    turnOnMonitor() {
        this.isMonitorTurnedOn = true;
    }

    //Выключаем монитор
    turnOffMonitor() {
        this.isMonitorTurnedOn = false;
    }

    //Переопределяем функцию получения мощности с учетом включенности монитора
    getPower() {
        //Вызываем родительские метод в контексте лампы, чтобы не дублировать код проверки подключения к розетке
        let basePower = super.getPower();
        //Если монитор включен, то прибавляем к общей мощности
        if (this.isMonitorTurnedOn)
            basePower += this.monitorPower;
        return basePower;
    }
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