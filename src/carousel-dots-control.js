import {WidgetControl} from 'ooui-widget';

/**
 * Элемент управления каруселью "точки".
 */
export default class CarouselDotsControl extends WidgetControl {

  /**
   * Создает экземпляр класса.
   * @param {CarouselWidget} carousel Виджет для управления.
   * @param {HTMLElement}    element  Корневой точек.
   */
  constructor(carousel, element) {
    super(carousel, element);

    /**
     * Класс, присваиваемый активному элементу.
     * @type {String}
     */
    this._activeClass = 'active';

    /**
     * Массив элементов точек.
     * @type {Array}
     */
    this._dots = this._initDots();


    this._onCarouselChange = this._onCarouselChange.bind(this);
    this._onDotClick = this._onDotClick.bind(this);

    this._bindEvents();
  }

  /**
   * Обновляет виджет.
   * @return {void}
   */
  refresh() {
    this._unbindEvents();
    this._dots = this._initDots();
    this._bindEvents();
  }

  /**
   * Удаляет виджет.
   * @return {void}
   */
  destroy() {
    this._unbindEvents();
    this._dots = [];
  }

  /**
   * Добавляет обработчики событий.
   * @return {void}
   */
  _bindEvents() {
    this.widget.element.addEventListener('change', this._onCarouselChange);

    for (let dot of this._dots) {
      dot.addEventListener('click', this._onDotClick);
    }
  }

  /**
   * Открепляет обработчики событий.
   * @return {void}
   */
  _unbindEvents() {
    this.widget.element.removeEventListener('change', this._onCarouselChange);

    for (let dot of this._dots) {
      dot.removeEventListener('click', this._onDotClick);
    }
  }

  /**
   * Возвращает массив элементов точек при создании экземпляра класса.
   * @return {Array} Массив.
   */
  _initDots() {
    let index = 0;
    let dots = [];

    for (let dot of this.element.childNodes) {
      if (dot.nodeType != Node.ELEMENT_NODE) continue;

      this._initDot(dot, index);
      dots.push(dot);

      index += 1;
    }

    return dots;
  }

  /**
   * Инициализирует точку при создании экземпляра класса.
   * @param  {HTMLElement} dot   Точка.
   * @param  {Number}      index Номер точки в массиве точке.
   * @return {void}
   */
  _initDot(dot, index) {
    dot.classList.remove(this._activeClass);

    if (index !== this.widget.index) {
      return;
    }

    dot.classList.add(this._activeClass);
  }

  /**
   * Возвращает точку с указанным номером.
   * @param  {Number}      index Номер точки.
   * @return {HTMLElement}       Точка.
   */
  _getDot(index) {
    return this._dots[index] || null;
  }

  /**
   * Возвращает номер указанной точки.
   * @param  {HTMLElement} dot Точка.
   * @return {Number}          Номер указанной точки.
   */
  _getDotIndex(dot) {
    return Array.prototype.indexOf.call(this._dots, dot);
  }

  /**
   * Обрабатывает событие начала смены слайдов.
   * @param  {Event} e Событие.
   * @return {void}
   */
  _onCarouselChange(e) {
    let currentIndex = e.index;
    let currentDot = this._getDot(currentIndex);
    let prevIndex = e.previousIndex;
    let prevDot = this._getDot(prevIndex);

    currentDot.classList.add(this._activeClass);
    prevDot.classList.remove(this._activeClass);
  }

  /**
   * Обрабатывает событие нажатия на точку.
   * @param  {Event} e Событие.
   * @return {void}
   */
  _onDotClick(e) {
    let dot = e.currentTarget;
    let index = this._getDotIndex(dot);
    this.widget.to(index);
  }
}
