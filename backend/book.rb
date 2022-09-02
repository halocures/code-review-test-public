class Book < ApplicationRecord
  belongs_to :author
  has_many :owned_books
  has_many :users, through: :owned_books

  # Search owners who have actually read the book by first name, last name, or both.
  # Returns an array of user ids
  def searched_readers(search_input)
    self
      .users
      .where('first_name ILIKE ?', search_input)
      .or(where('last_name ILIKE ?', search_input))
      .select(:id)
  end

  # Returns an array of objects with info about the first owner of every book
  def self.first_owners
    Book
      .all
      .includes(owned_book: :user)
      .map do |book|
        first_owned_book = self.owned_books.first
        first_owner = first_owned_book.user

        {
          first_name: first_owner.first_name,
          last_name: first_owner.last_name,
          first_owned: first_owned_book.created_at
        }
      end
  end

  # Returns stats about a particular genre given the genre string
  def self.genre_stats(genre)
    genre_books = Book.where(genre: genre)

    genre_books_total_pages = 0
    total_genre_books = genre_books.count
    genre_authors = []

    genre_books.map do |book|
      genre_books_total_pages = genre_books_total_pages + book.page_length

      genre_authors << book.author.id if !genre_authors.include?(book.author.id)
    end

    total_authors = Author.all.length

    return(
      {
        average_page_length: genre_books_total_pages / total_genre_books,
        percentage_of_authors: genre_authors.length / total_authors
      }
    )
  end
end

# == Schema Information
#
# Table name: books
#
#  id           :bigint           not null, primary key
#  author_id    :integer
#  page_length  :integer
#  genre        :string
#  supply       :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
# Indexes
#
