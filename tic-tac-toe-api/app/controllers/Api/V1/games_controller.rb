class Api::V1::GamesController < ApplicationController

  def index
    @games = Game.all
    render json: @games, status:200
  end

  def show
    @game = Game.find(params[:id])
    render json: @game, status:200
  end

  def create
    @game = Game.new
    #@game = Game.find(params[:id])
    @game = Game.create(game_params)
    render json: @game, status:200
  end

  private

  def game_params
    params.require(:game).permit(:players, :size)
  end
end
