using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FitUpSensei.API.Models;

[Table("sesiones")]
public class Sesion
{
    [Key]
    [Column("id")]
    public Guid Id { get; set; }

    [Required]
    [Column("cliente_id")]
    public Guid ClienteId { get; set; }

    [Required]
    [Column("rutina_id")]
    public Guid RutinaId { get; set; }

    [Required]
    [Column("fecha")]
    public DateOnly Fecha { get; set; }

    [Column("completada")]
    public bool? Completada { get; set; }

    [Column("duracion_min")]
    public int? DuracionMin { get; set; }

    [Column("created_at")]
    public DateTime CreatedAt { get; set; }
}
