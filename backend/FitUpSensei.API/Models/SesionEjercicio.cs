using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("sesion_ejercicios")]
public class SesionEjercicio
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("sesion_id")]
    public Guid SesionId { get; set; }

    [Required]
    [Column("rutina_ejercicio_id")]
    public Guid RutinaEjercicioId { get; set; }

    [Column("serie_numero")]
    public int? SerieNumero { get; set; }

    [Column("repeticiones_realizadas")]
    public int? RepeticionesRealizadas { get; set; }

    [Column("peso_realizado_kg")]
    public decimal? PesoRealizadoKg { get; set; }

    [Column("rpe")]
    public int? Rpe { get; set; }

    [Column("completado")]
    public bool? Completado { get; set; }

    [Column("notas_cliente")]
    public string? NotasCliente { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
