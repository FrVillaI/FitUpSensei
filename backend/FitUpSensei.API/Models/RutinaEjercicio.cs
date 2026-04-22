using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("rutina_ejercicios")]
public class RutinaEjercicio
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("rutina_id")]
    public Guid RutinaId { get; set; }

    [Required]
    [Column("ejercicio_id")]
    public Guid EjercicioId { get; set; }

    [Required]
    [Column("orden")]
    public int Orden { get; set; }

    [Column("series")]
    public int? Series { get; set; }

    [Column("repeticiones")]
    public int? Repeticiones { get; set; }

    [Column("peso_objetivo_kg")]
    public decimal? PesoObjetivoKg { get; set; }

    [Column("tiempo_descanso_seg")]
    public int? TiempoDescansoSeg { get; set; }

    [Column("notas")]
    public string? Notas { get; set; }
}
