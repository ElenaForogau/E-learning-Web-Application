class Course {
  constructor(
    id,
    title,
    description,
    category,
    startDate,
    endDate,
    sessions,
    price,
    availableSpots,
    languages
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sessions = sessions;
    this.price = price;
    this.availableSpots = availableSpots;
    this.languages = languages;
  }
}

module.exports = Course;
