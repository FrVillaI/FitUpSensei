using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("entrenadores")]
public class Entrenador
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Column("presentacion")]
    public string? Presentacion { get; set; }

    [Column("ejercicio_favorito")]
    public string? EjercicioFavorito { get; set; }

    [Column("puntuacion")]
    public decimal? Puntuacion { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
